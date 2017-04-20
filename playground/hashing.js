const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

let data = {
  id: 10
};

let secret = 'pepe'

let token = jwt.sign(data, secret) //creates hash with secret

let decodedToken = jwt.verify(token, secret)

console.log(decodedToken)

// let message = 'hello'
// let hash = SHA256(message).toString();

// console.log(hash);

// let data = {
//   id: 4
// };

// let secret = 'pepe'

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data)+secret).toString()
// }

// let resultHash = SHA256(JSON.stringify(token.data)+secret).toString()

// if (resultHash ===token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed do not trust.')
// }

// // give user a token 