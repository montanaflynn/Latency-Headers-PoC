// Load the http module
var http = require('http');

// This is the starting timestamp of when the request was sent
var requestSent = new Date().getTime()

// Get the user supplied server or local test server at port 1337
http.get(process.argv[2] || "http://localhost:1337", function(response) {

  // Save the timestamp of when the response was received
  var responseReceived = new Date().getTime()

  // Save the headers we care about in variables
  var responseSent = response.headers['x-response-sent'] || false
  var requestReceived = response.headers['x-request-received'] || false

  // If the server is not sending the latency headers we stop here
  if (!responseSent || !requestReceived){
    console.log("\n\033[31m", "The server did not respond with latency headers", "\n\033[39m")
    return false
  }

  // The math to determine the latencies
  var outgoingLatency = requestReceived - requestSent
  var processingLatency = responseSent - requestReceived
  var incomingLatency = responseReceived - responseSent
  var roundtripLatency = outgoingLatency + processingLatency + incomingLatency
  
  // Print out the latency in human readable format
  console.log("\033[32m=================================================")
  console.log("Latency Benchmarks: ")
  console.log("Total outgoing network latency: " + outgoingLatency + "ms")
  console.log("Total processing time latency: " + processingLatency + "ms")
  console.log("Total incoming network latency: " + incomingLatency + "ms")
  console.log("Total round trip latency: " + roundtripLatency + "ms")
  console.log("=================================================\033[39m")
  return true

}).on('error', function(e) {
  
  // There was an error connecting to the server
  console.log("\n\033[31m", "There was an error connecting to the server", "\n\033[39m");
  return false
  
});
