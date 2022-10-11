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
    <form onSubmit={ handleSubmit } className="border-gray-300 border-2 rounded-lg p-3 bg-red-600 mt-3">
      <h1 className="text-red-100"> Update => {capTitle(todoTitle)}</h1>
        {todoNotFoundError ? (
        <h2 className="block mb-2 text-sm font-medium text-black">
          {todoNotFoundError} 
            <br />
            <Link to="/new">Click here to add a Todo!</Link>
        </h2>
      ) : null}
      {/* todoName input div*/}
      <div className="mb-6">
        <label htmlFor="todoName" className="block mb-2 text-sm font-medium text-red-100">Todo Name: </label>
        <input type="text" 
            id="todoName" 
            className="bg-red-100 border border-gray-100 text-black text-sm rounded-lg focus:ring-red-500 block w-full p-2.5 dark:text-red-600" 
            required 
            onChange={ (e) => setTodoName(e.target.value) }
            value={ todoName }
            />
          { error.todoName ? <p> { error.todoName.message }</p> : null }
      </div>

        { /* todoType input div */ }
      <div className="mb-6">
          <label htmlFor="todoType" className="block mb-2 text-sm font-medium text-red-100">Todo Type:</label>
        <input type="text" 
            id="todoType" 
            className="bg-red-100 border border-gray-100 text-black text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-gray-100 dark:text-red-600 dark:focus:ring-red-500" 
            required
            onChange={ (e) => setTodoType(e.target.value) }
            value={ todoType }
            />
          { error.todoType ? <p> { error.todoType.message }</p> : null }
      </div>

        { /* todoDescription input div */ }
      <div className="mb-6">
        <label htmlFor="todoDescription" className="block mb-2 text-sm font-medium text-red-100">Todo Description:</label>
       <textarea id="todoDescription" 
            rows="4" 
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-red-500 dark:bg-red-100 dark:border-gray-100 dark:text-red-600" 
            onChange={ (e) => setTodoDescription(e.target.value) }
            value={ todoDescription }
          >
      </textarea>   { error.todoDescription ? <p> { error.todoDescription.message }</p> : null }
      </div>

        { /* Submit form button and a Link to "Cancel" that durects the User back home */ }
      <div className="mb-6 flex justify-between">
      <button type="submit" className="text-red-600 bg-red-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-100 dark:hover:bg-red-600 dark:hover:text-red-100 dark:hover:ring-red-100">Submit</button>
      <Link to="/" className="text-red-600 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-100 dark:hover:bg-red-600 dark:hover:text-red-100 dark:focus:ring-blue-800">Cancel</Link>
      </div>
    </form>
    </div>
  );

};

export default UpdateTodo;
