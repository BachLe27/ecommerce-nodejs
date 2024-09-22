'use strict'

const { default: mongoose } = require("mongoose")
const os = require('os');

const _SECONDS = 5000;
const MAX_CONNECTION_PER_CORE = 5;
// count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length
  console.log(`Number of connections::${numConnection}`);
}

// check overload

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = numCores * MAX_CONNECTION_PER_CORE;

    console.log(`Active connections: ${numConnection}`);

    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);


    if (numConnection > maxConnections) {
      console.log(`Connection overload detected`);
    }
  }, _SECONDS);
}

module.exports = {
  countConnect,
  checkOverload
}