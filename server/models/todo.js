const mongoose = require('mongoose');

//create a toDo Model!
//validators
const toDo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minLength: 1,
		trim: true //trim any leading or trailing white space
	},
	completed: {
		type: Boolean,
		default: false,
	},
	completedAt: {
		type: Number,
		default: null,
	}
});

module.exports = {toDo};

// destructuring..... module.exports = {toDo:toDo}