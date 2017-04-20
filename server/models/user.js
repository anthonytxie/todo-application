const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const secret = 'pepe'
let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      async: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String, 
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true,
    }
  }]

});

// arrow functions do not bind a this keyword
//everything here turns into an instance method (instance of user)
UserSchema.methods.generateAuthToken = function() {
  let user = this; // this gets called on the User document
  let access ='auth'
  let token = jwt.sign({_id: user._id.toHexString(), access}, secret).toString();
  user.tokens.push({access, token})
  return user.save().then(()=> {
    return token;
  })
};

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject(); //where only properties on doc exist
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.statics.findByToken = function (token) {
  let User = this; // get called on the model
  let decoded;
  try {
    decoded = jwt.verify(token, secret)
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access':'auth',
  })

} //everything turns into a model method



 //can add any instance methods we want

let User = mongoose.model('User', UserSchema);

module.exports = {User};