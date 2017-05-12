const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8888', {
  perMessageDeflate: false
});