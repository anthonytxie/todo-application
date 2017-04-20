const {User} = require('./../models/user')

let authenticate = (req,res, next)=> {
   let token = req.header('x-auth');
  User.findByToken(token).then((doc) => {
    if (!doc) {
      Promise.reject();
    }
    req.user = doc
    req.token = token
    next();
  }).catch((err) => {
    res.status(401).send()
  });
}

module.exports = {authenticate};