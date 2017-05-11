var http = require("http");
var qs = require('querystring');

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

    if (new_data === true) {
      new_data = false
      var json = JSON.stringify(message);
      res.end(json)
    }
    res.end('Empty')
  }
  else if (req.method === 'POST' && req.url === '/messages/') {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var post_data = qs.parse(body);
      // now you can access `data.email` and `data.password`
      time = Date.now()
      new_data = true
      console.log(post_data)
      console.log(post_data.message)
      console.log(typeof(post_data))
      message = {timestamp: time, data: post_data}

      res.writeHead(200);
      res.end(JSON.stringify(post_data));
    });
  } else {
    res.writeHead(404);
    res.end();
  }





}).listen(8888, 'localhost');

