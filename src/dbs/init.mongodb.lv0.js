'use strict'

const { default: mongoose } = require("mongoose");

const connectString = `mongodb://localhost:27017`

mongoose.connect(connectString)
  .then(_ => console.log(`Connected Mongodb Success`))
  .catch(err => console.log(`Error Connect!`, err))

if (1 === 1) {
  mongoose.set('debug', true);
  mongoose.set('debug', { color: true });
}

module.exports = mongoose