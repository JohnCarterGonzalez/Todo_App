import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateTodo = () => {
  const [todoName, setTodoName] = useState("");
  const [todoType, setTodoType] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  
  // Create state array to hold errors
  const [error, setError] = useState({});

  // Navigation func for after the form has been submitted
  const navigate = useNavigate();

  // To handle th elogic of the form submission
  const handleSubmit = (e) => {
    // prevent the data refresh behaviour of browsers
    e.preventDefault();

    // Axios post request to create a new pet
    axios
      .post("http://localhost:8000/api/todos", { todoName, todoType, todoDescription})
      .then((res) => {
        console.log(res);
        // Navigates the user back to the home screen once the form has been submitted
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
      <h1> Add a Todo</h1>
    <form onSubmit={ handleSubmit }>
        { /* petName input div */ }
      <div className="mb-6">
        <label htmlFor="petName" className="block mb-2 text-sm font-medium text-black">Todo Name: </label>
        <input type="text" 
            id="petName" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
            onChange={ (e) => setTodoName(e.target.value) }
            value={ todoName }
            />
          { error.todoName ? <p> { error.todoName.message }</p> : null }
      </div>

        { /* petType input div */ }
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

        { /* petDescription input div */ }
      <div className="mb-6">
        <label htmlFor="petDescription" className="block mb-2 text-sm font-medium text-black">Todo Description:</label>
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
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      <Link to="/" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Cancel</Link>
      </div>
    </form>
    </div>
  );
};

export default CreateTodo;

