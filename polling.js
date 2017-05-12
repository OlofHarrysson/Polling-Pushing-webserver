var http = require("http");

var messages = []

http.createServer(function(req, res) {
  console.log("Polling Server")
  if (req.method === 'OPTIONS') { // For preflight requests
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  if (req.method === 'GET' && req.url === '/messages/') {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = JSON.stringify(messages);
    res.end(json)

  }
  else if (req.method === 'POST' && req.url === '/messages/') {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var post_data = JSON.parse(body);
      messages.push({timestamp: Date.now(), data: post_data.message})

      res.writeHead(200);
      res.end(JSON.stringify(post_data));
    });
  } else {
    res.writeHead(404);
    res.end();
  }


}).listen(8888, 'localhost');

