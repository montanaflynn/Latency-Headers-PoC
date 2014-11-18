# Latency Headers PoC

Adding HTTP headers to http responses enables developers to gain a better view into their API layer's latency and networking bottlenecks.

### Explaination

Basically there are two headers introduced in this proof of concept:

- `x-request-received` is set by the server with the timestamp of when the request was received
- `x-response-sent` is set by the server with the timestamp of when the response was sent

With these headers in place the client can then determine the following:

- **outgoing network latency**: time between client sending the request and server receiving it
- **server processing latency**: time between server receiving the request and sending the response
- **incoming network latency**: time between server sending the response and client receiving it
- **total round trip latency**: time between client sending the request and receiving response

### Try it out

An example server and client is included in this repo so this works:

```shell
git clone git@github.com:montanaflynn/Latency-Headers-PoC.git
cd Latency-Headers-PoC
npm start
```

That should output something like this:
    
    =================================================
    Latency Benchmarks:
    Total outgoing network latency: 12ms
    Total processing time latency: 55ms
    Total incoming network latency: 4ms
    Total round trip latency: 71ms
    =================================================

### Complete Example

#### server.js

```js
// Load the http module
var http = require('http');

// Make it easy to pkill from npm
process.title = "latencyServer"

// Create the server
var server = http.createServer(function (request, response) {

  // Set the x-request-received header with the current timestamp
  response.setHeader('x-request-received', new Date().getTime());

  // Simulate a delay for processing latency to show up
  setTimeout(function(){

    // Set the x-response-sent header with the current timestamp
    response.setHeader('x-response-sent', new Date().getTime());

    // Set the header status to ok and the content type
    response.writeHead(200, {"Content-Type": "text/plain"});

    // Return the demobligatory hello world response
    response.end("Hello World\n");

  // Remember that delay? 50-75ms sounds like a good target
  }, Math.floor((Math.random() * 25) + 50))

});

// Listen on localhost:1337
server.listen(1337);
```

#### app.js

```js
// Require http for requests
var http = require('http')

// Save the timestamp of when the request was sent as its required
var requestSent = new Date().getTime()

// Send the request to a server that returns the latency headers
http.get("http://localhost:1337", function(res) {

  // Save the response headers for easy access later
  var headers = res.headers

  // Save the timestamp of when the response was received
  var responseReceived = new Date().getTime()

  // Save the headers we care about in variables
  var responseSent = headers['x-response-sent'] || false
  var requestReceived = headers['x-request-received'] || false

  // If the latency headers do not exist
  if (!responseSent || !requestReceived){
    throw new Error("The server did not respond with latency headers.")
  }

  // The math to determine the latencies
  var outgoingLatency = requestReceived - requestSent
  var processingLatency = responseSent - requestReceived
  var incomingLatency = responseReceived - responseSent
  var roundtripLatency = outgoingLatency + processingLatency + incomingLatency

  // Return back the latencies
  var results = {
      "outgoingLatency" : outgoingLatency,
      "processingLatency" : processingLatency,
      "incomingLatency" : incomingLatency,
      "roundtripLatency" : roundtripLatency
  }

  // Output the results
  console.log(results)
})
```

### Related projects

#### Client Implementations
- [Node.js Standard Library](https://github.com/montanaflynn/Latency-Headers-PoC/blob/master/client.js)
- [Latency Headers Benchmark](https://github.com/montanaflynn/latency-header-benchmark/)

#### Server Implementations

- [Node.js Standard Library](https://github.com/montanaflynn/Latency-Headers-PoC/blob/master/examples/node-standard-http/index.js)
- [Express Latency Header Middleware](https://github.com/montanaflynn/express-latency-headers)
- [Koa Latency Header Middleware](https://github.com/montanaflynn/koa-latency-headers)

## MIT license

Copyright (c) 2014, Montana Flynn (http://anonfunction.com/)
