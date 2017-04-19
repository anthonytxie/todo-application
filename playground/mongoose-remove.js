const {mongoose} = require('./../server/db/mongoose');
const {toDo} = require ('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb'); //destructuring

// //remove all
// toDo.remove({}).then((result) => {
//   console.log(result);
// })

// // find one and remove and return it
// Todo.findOneAndRemove({}).then((result)=> {
//   console.log(result)
// })

// find one by ID and remove and return it
toDo.findByIdAndRemove('58f6dca66c05d520f83fceaa').then((result)=> {
  console.log(result)
});