const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const TodoSchema = new mongoose.Schema (
	// pet name, pet type, pet description, and pet skills
	// pet name-description must be > 3 characters
	// pet skills may be between 0-3
	// unique error messages
	{
	todoName: {
		type: String,
		unique: true,
		required: [ true, "Please add a todo name." ],
		minLength: [ 3, "The name of the todo must be longer than 3 characters." ],
		maxLength: [ 255, "Tryhard......" ],
	},
	todoType: {
		type: String,
		required: [ true, "Please add a todo type." ],
		minLength: [ 3, "The type of the todo must be longer than 3 characters" ],
		maxLength: [ 255, "Tryhard" ],
	},
	todoDescription: {
		type: String,
		required: [ true, "Please described your todo." ],
		minLength: [ 3, "The description of the todo must be longer than 3 characters." ],
		maxLength: [ 255, "Love the enthusiasm but thats enough." ]
	},
	}, 
	{ timestamps: true }
)
// unique validate for petName
TodoSchema.plugin(uniqueValidator, { message: 'That todo is already logged, please choose another.' });

// limit the number of skills to 3
function arrayLimit(val) {
	return val.length <= 3;
}
/**
* If you wanted to validate the petName manually
PetSchema.set('validateBeforeSave', false);
PetSchema.path('petName').validate(async( petName, done ) {
	const petNameCount = await mongoose.models.Pet.countDocuments({ petName })
		return !petNameCount
}, console.log("The Name of the pet already exists");
*
*/
TodoSchema.post('save', function(error, todoName, next) {
  if (error.petName === 'MongoError' && error.code === 11000) {
    next(new Error(console.log('The name of the todo must be unique')));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
