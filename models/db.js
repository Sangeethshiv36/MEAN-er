const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (!err) {
      console.log('MongoDB Connection succeeded.');
    } else {
      console.log(
        'Error in MongoDB Connection : ' + JSON.stringify(err, undefined, 2)
      );
    }
  }
);
