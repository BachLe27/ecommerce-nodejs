'use strict'

const { default: mongoose } = require("mongoose")
const { db: { host, name, port } } = require('../configs/config.mongodb')

const connectString = `mongodb://${host}:${port}/${name}`;

console.log('connectString:: ', connectString);


const { countConnect } = require('../helpers/check.connect');

class DatabaseConnection {
  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose.connect(connectString)
      .then((_) => {
        countConnect();
        console.log(`Connected Mongodb Success Pro`)
      })
      .catch(err => console.log(`Error Connect!`, err))
  }

  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();

    }
    return DatabaseConnection.instance;
  }
}

const instanceMongodb = DatabaseConnection.getInstance()


module.exports = instanceMongodb