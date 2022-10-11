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
    <form onSubmit={ handleSubmit } className="border-gray-300 border-2 rounded-lg p-3 bg-red-600 mt-3">
      <h1 className="text-red-100">Add a Todo and get productive!</h1>
        { /* todoName input div */ }
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

export default CreateTodo;

