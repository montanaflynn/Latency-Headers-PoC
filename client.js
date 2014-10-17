// Make the request to the server with http://unirest.io
var unirest = require('unirest')
 
// This is the starting timestamp of when the request was sent
var requestSent = new Date().getTime()
 
unirest
  // Get supported server at port 1337 as set in server.js
  .get('http://localhost:1337/')

  // Send the response to an anonymous function
  .end(function(response){

    // Run the response handler function to get the latency
    var latencyBenchmark = benchmarkLatency(response)
    console.log(latencyBenchmark)

    // Instead of console.log you could put it in a database
    // db.logs.save(latencyBenchmark)
  })

// The response handler to process the HTTP request latency
function benchmarkLatency(response) {
  if (response.status === 200) {
    // Save the timestamp of when the response was received
    var responseReceived = new Date().getTime()

    // Save the headers set by the server
    var requestReceived = response.headers['x-request-received']
    var responseSent = response.headers['x-response-sent']

    // The math to determine the latencies
    var outgoingLatency = requestReceived - requestSent
    var processingLatency = responseSent - requestReceived
    var incomingLatency = responseReceived - responseSent
    var roundtripLatency = outgoingLatency + processingLatency + incomingLatency
    
    // Print out the latency in human readable format
    console.log("=================================================")
    console.log("Latency Benchmarks: ")
    console.log("Total outgoing network latency: " + outgoingLatency + "ms")
    console.log("Total processing time latency: " + processingLatency + "ms")
    console.log("Total incoming network latency: " + incomingLatency + "ms")
    console.log("Total round trip latency: " + roundtripLatency + "ms")
    console.log("=================================================\n")

    // Return the latency in JSON so you log it, etc...
    return {
      "outgoing" : outgoingLatency + "ms",
      "processing" : processingLatency + "ms",
      "incoming" : incomingLatency + "ms",
      "roundtrip" : roundtripLatency + "ms"
    }
  }
}