import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from "axios";

const TodoDetail = () => {
    //Because we named the variable in our app.js path id, that is its key.
    //We gave that variable its value in Display.js when we traveled here via "Link".
    //That will allow us to destructure the value from the useParams hook using the id key.
    const { id } = useParams();
    const navigate = useNavigate();
    const [todoDetail, setTodoDetail] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/todos/' + id)
            .then((res) => {
                console.log(res.data);
                setTodoDetail(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]); 
    //React will give us an "unused dependency" Yellow-Label Warning if we do not include this in the dependency array
    //Functionally, this is useless, we do not need this useEffect to run based on the changing of the id while in this component because there are no changes occurring here.
    //So in this example the above or simply [] will work the same way. We can just do this to eliminate the warning.

    const deleteHandler = () => {
        axios.delete('http://localhost:8000/api/todos/' + id)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center mt-5">
        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-red-600 dark:border-gray-200">
         <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-100">{todoDetail.todoName}</h5>
            <p className="mb-3 font-normal text-red-100 dark:text-red-100">Todo Type: {todoDetail.todoType}</p>
            <p className="mb-3 font-normal text-red-100 dark:text-red-100">Todo Description: {todoDetail.todoDescription}</p>
            <Link to="/" onClick={deleteHandler} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-red-600 bg-red-100 rounded-lg hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-100 dark:hover:bg-red-600 dark:hover:text-red-100 dark:focus:ring-blue-800">
                Complete the Todo
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
        </div>
        </div>
    );

};    
export default TodoDetail;

