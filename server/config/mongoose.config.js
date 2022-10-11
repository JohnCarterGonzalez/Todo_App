const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/todoAppDB", { //when running nodejs (17.x) or newer the localhost must bve replaced with "127.0.0.1" https://www.mongodb.com/community/forums/t/mongooseserverselectionerror-connect-econnrefused-127-0-0-1-27017/123421/3
		useNewUrlParser: true, 
		useUnifiedTopology: true,
	})
	.then(() => console.log("Established a connection to the DB"))
	.catch((err) => console.log("There is a connection error, pleasse check the config for missing semicolons...", err));

