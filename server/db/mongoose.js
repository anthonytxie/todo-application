const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //telling mongoose to use native Promises
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};

// destructuring..... module.exports = {mongoose:mongoose}

