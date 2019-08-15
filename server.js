'use strict';

const net = require('net');
const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );
let allowedEvents = ['error', 'save','delete', 'create', 'attack'];
let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('close', () => {
    delete socketPool[id];
  });
});

/**
 *
 *
 * @param {*} buffer
 */
let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  let [event, payload] = text.split(/\s+(.*)/);

  if (allowedEvents.includes(event)){

    let eventPayload = {event, payload};
    for (let socket in socketPool) {
      socketPool[socket].write(JSON.stringify(eventPayload));
    }
  }
  else {
    console.log(`IGNORE ${event}`);
  }
};


