const mongoose = require('mongoose');
const passport = require('passport');

const chartDb = require('../data.json');
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

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(400).json(err);
    else if (user) return res.status(200).json({ "token": user.generateJwt() });
    else return res.status(404).json(info);
  })(req, res);
}

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res.status(404).json({ status: false, message: 'User record not found' });
    else
      return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email']) });
  });
}

module.exports.getChartData = async (req, res, next) => {
  try {
    const data = await chartDb;
    if (!data) {
      return res.staus(400).json({ status: false, message: 'No data found' })
    }
    res.json(data);
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

