// Load the http module
var http = require('http');

// Make it easy to pkill from npm
process.title = "latencyPoC"

// Create the server
var server = http.createServer(function (request, response) {

  // Set the x-request-received header with the current timestamp
  response.setHeader('x-request-received', new Date().getTime());

  // Simulate a delay between 50-75ms for processing latency
  setTimeout(function(){

    // Set the x-response-sent header with the current timestamp
    response.setHeader('x-response-sent', new Date().getTime());

    // Set the header status to ok and the content type
    response.writeHead(200, {"Content-Type": "text/plain"});

    // Return the obligatory hello world response
    response.end("Hello World\n");

  }, Math.floor((Math.random() * 75) + 50))

});

// Listen on localhost:1337
server.listen(1337);
