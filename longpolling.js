var http = require("http");
var events = require('events');
var eventEmitter = new events.EventEmitter();

// var sendMessage = function sendMessage(res) {
//   console.log("SEND MESSAGES")
// }

var messages = []

http.createServer(function(req, res) {
  if (req.method === 'OPTIONS') { // For preflight requests
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  if (req.method === 'GET' && req.url === '/messages/') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive"});

    console.log("Get Request");
    eventEmitter.on('newMessage', function() {
      console.log("SEND MESSAGES")
      console.log(res)
      var json = JSON.stringify(messages);
      res.end(json)
    });

  }
  else if (req.method === 'POST' && req.url === '/messages/') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("Post Request");

    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var post_data = JSON.parse(body);
      messages.push({timestamp: Date.now(), data: post_data.message})

      eventEmitter.emit('newMessage', value)

      res.writeHead(200);
      // res.end(JSON.stringify(messages));
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end();
  }


}).listen(8888, 'localhost');
