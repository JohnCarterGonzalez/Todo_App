const Todo = require("../models/todos.models");

// create a new pet via method and form submission
const createTodo = ( req, res ) => {
	// Mongoose method to create a new documents in the pet collection
	Todo.create( req.body )
		.then(( newTodo ) => {
			res.json( { newTodo } );
	})
		.catch( ( err ) => {
			res.status(400).json({ err });
	});
};

//get all the pets
const getAllTodos = ( req, res ) => {
	// Mongoose method to find all documents
	Todo.find()
		.then(( allTodos ) => {
			res.json( allTodos );
	})
		.catch(( err ) => {
			// if there are errors retrieve them from err
			res.status(400).json({ err });
	});
};

// GET on pet
const getOneTodo = ( req, res ) => {
	// Mongoose method to find one pet by using the id of the pet as a param
	Todo.findOne({ _id: req.params.id })
		.then((foundTodo) => {
			res.json(foundTodo);
	})
		.catch((err) => {
			res.status(400).json({ err });
	});
};

// Mongoose method to update a specific todo using todo id as a param 
const updateTodo = ( req, res ) => {
	Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
		// makes the updated Pet a new pet and makes sure to run validate on the new entries
		new: true,
		runValidators: true,
		context: 'query',
	})
		.then((updatedTodo) => {
			res.json({ updatedTodo });
	})
		.catch((err) => {
			res.status(400).json({ err });
	});
};

// Mongoose method to delete a todo, using the Pet id as a param
const deleteTodo = ( req, res ) => {
	Todo.deleteOne({ _id: req.params.id })
		.then((deletedTodo) => {
			res.json({deletedTodo});
	})
		.catch((err) => {
			res.status(400).json({ err });
	});
};


// Export the approporiate modules for the router
module.exports = {
	createTodo,
	getAllTodos,
	getOneTodo,
	updateTodo,
	deleteTodo,
}
