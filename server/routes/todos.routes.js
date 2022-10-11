const tController = require("../controllers/todos.controllers.js");

module.exports = (app) => {
	app.get("/api/todos", tController.getAllTodos);
	app.post("/api/todos", tController.createTodo);
	app.get("/api/todos/:id", tController.getOneTodo);
	app.put("/api/todos/:id", tController.updateTodo);
	app.delete("/api/todos/:id", tController.deleteTodo);
}
