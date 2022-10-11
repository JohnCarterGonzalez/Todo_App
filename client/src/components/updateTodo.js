import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateTodo = () => {
  const { id } = useParams();
  const [todoName, setTodoName] = useState("");
  const [todoType, setTodoType] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [error, setError] = useState({});
  const [todoNotFoundError, setTodoNotFoundError] = useState("");
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todos/" + id)
      .then((res) => {
        console.log(res.data);
        setTodoName(res.data.todoName);
        setTodoType(res.data.todoType);
        setTodoDescription(res.data.todoDescription);
        setTodoTitle(res.data.todoName)
      })
      .catch((err) => {
        console.log(err.response);
        setTodoNotFoundError('Pet not found using that ID');
      });
  }, [id]);

  const capTitle = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8000/api/todos/" + id, { 
      todoName, 
      todoType, 
      todoDescription, 
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setError(err.response.data.err.errors);
      });
  };

  return (
    // make the form use the handle submit
    <div className="flex flex-col justify-center items-center">
      <h1> Update {capTitle(todoTitle)}</h1>
    <form onSubmit={ handleSubmit }>
        {todoNotFoundError ? (
        <h2 className="block mb-2 text-sm font-medium text-black">
          {todoNotFoundError} 
            <br />
            <Link to="/new">Click here to add a Todo!</Link>
        </h2>
      ) : null}
        { /* todoName input div */ }
      <div className="mb-6">
        <label htmlFor="petName" className="block mb-2 text-sm font-medium text-black">Todo Name: </label>
        <input type="text" 
            id="petName" 
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
            onChange={ (e) => setTodoName(e.target.value) }
            value={ todoName }
            />
          { error.todoName ? <p> { error.todoName.message }</p> : null }
      </div>

        { /* todoType input div */ }
      <div className="mb-6">
          <label htmlFor="petType" className="block mb-2 text-sm font-medium text-black">Todo Type:</label>
        <input type="text" 
            id="petType" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required
            onChange={ (e) => setTodoType(e.target.value) }
            value={ todoType }
            />
          { error.todoType ? <p> { error.todoType.message }</p> : null }
      </div>

        { /* todoDescription input div */ }
      <div className="mb-6">
        <label htmlFor="petDescription" className="block mb-2 text-sm font-medium text-black">Todo Description</label>
       <textarea id="petDescription" 
            rows="4" 
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            onChange={ (e) => setTodoDescription(e.target.value) }
            value={ todoDescription }
          >
      </textarea>   { error.todoDescription ? <p> { error.todoDescription.message }</p> : null }
      </div>

        { /* Submit form button and a Link to "Cancel" that durects the User back home */ }
      <div className="mb-6">
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
      <Link to="/" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Cancel</Link>
      </div>
    </form>
    </div>
  );

};

export default UpdateTodo;
