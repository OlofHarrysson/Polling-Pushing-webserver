var http = require("http");

var message = undefined
var new_data = false

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
      new_data = true
      message = {timestamp: Date.now(), data: post_data.message}

      res.writeHead(200);
      res.end(JSON.stringify(message));
    });
  } else {
    res.writeHead(404);
    res.end();
  }


}).listen(8888, 'localhost');


function checkNewData(res) {
  setTimeout(function(){

  }, 10000);
}
