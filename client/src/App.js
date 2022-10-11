import ListTodo from "./components/listTodo.js";
import CreateTodo from "./components/createTodo.js";
import UpdateTodo from "./components/updateTodo.js";
import TodoDetail from "./components/todoDetail.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/" element={ <ListTodo /> } />
          <Route path="/new" element={ <CreateTodo /> } />
          <Route path="/todos/edit/:id" element={ <UpdateTodo /> } />
          <Route path="/todos/:id" element={ <TodoDetail /> } />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
