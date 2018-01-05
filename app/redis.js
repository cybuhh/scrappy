'use strict';

const { promisify } = require('util');
const redis = require('redis');

module.exports = (dsn) => {
  const client = redis.createClient(dsn);
  const sendCommand = promisify(client.send_command).bind(client);

  return {
    client,
    sendCommand,
    exists: key => sendCommand('exists', [key]),
    get: key => sendCommand('get', [key]),
    mget: keys => sendCommand('mget', [keys]),
    mset: pairs => sendCommand('mset', [pairs]),
    expire: (key, ttl) => sendCommand('expire', [key, ttl]),
  };
};
