const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, data) => {
    if (!err) res.send(data);
    else {
      if (err.code == 11000)
        res.status(422).send(['Duplicate email address found']);
      else return next(err);
    }
  });
};
