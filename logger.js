'use strict';

const net = require('net');
const client = new net.Socket();

let address = 'localhost';

client.connect(3001, address, () => {
  console.log(`Connection open on ${address}`)
});

client.on('data', function(data) {
  let payload = JSON.parse(data);
  console.log(payload);
});

client.on('save', function(data) {
  let payload = JSON.parse(data);
  console.log(`you saved :', ${payload}`);
});

client.on('error', function() {
  console.log('u fucked up')
});


client.on('close', function() {
  console.log('Connection closed')
});