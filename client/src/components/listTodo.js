import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "./Navbar.js";

const ListTodo = () => {
  const [allTodos, setAllTodos] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todos")
      .then((res) => {
        console.log(res.data);
        setAllTodos(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);


  const handleDelete = (idTodo) => {
    axios
      .delete(`http://localhost:8000/api/todos/${idTodo}`)
      .then((res) => {
        console.log("The todo has been yeeted");
        console.log(res);
        const filteredTodos = allTodos.filter((todo) => {
          return todo._id !== idTodo;
        });
        setAllTodos(filteredTodos);
        navigate("/");
      })
      .catch((err) => {
        console.log("There is an error in the logic or the server.", err.response);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    <Navbar />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Todo Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Todo Type
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Todo Description
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Actions Available
                    </th>
                </tr>
            </thead>
            <tbody>
              {allTodos.map((todo, index) => {
                    return (
                      <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <Link className="content-center" to={`/todos/${todo._id}`}>
                          <td className="content-center" >{todo.todoName}</td>
                        </Link>
                        <td className="py-4 px-6" id="petType">{todo.todoType}</td>
                        <td className="py-4 px-6">{todo.todoDescription}</td>
                        <td className="py-4 px-6">
                          <div className="inline-flex rounded-md shadow-sm" role="group">
                            <Link to={`/pets/edit/${todo._id}`}>
                              <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Edit</button>
                            </Link>
                            <button
                              onClick={() => handleDelete(todo._id)}
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Complete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
        </table>
    </div>
    </div>
  );
};

export default ListTodo;

