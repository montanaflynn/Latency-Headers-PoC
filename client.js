var unirest = require('unirest')
 
// This is the starting timestamp of when the request was sent
var requestSent = new Date().getTime()
 
unirest
  .get('http://localhost:1337/')
  .end(function(res){
    if (res.status === 200) {
 
      // Save the timestamp of when the response was received
      var responseReceived = new Date().getTime()
 
      // Save the headers set by the server
      var requestReceived = res.headers['x-request-received']
      var responseSent = res.headers['x-response-sent']
 
      // The math to determine the latencies
      var outgoingLatency = requestReceived - requestSent
      var processingLatency = responseSent - requestReceived
      var incomingLatency = responseReceived - responseSent
      var roundtripLatency = outgoingLatency + processingLatency + incomingLatency
      
      // Print out the latency in human readable format
      console.log("Total outgoing network latency: " + outgoingLatency + "ms")
      console.log("Total processing time latency: " + processingLatency + "ms")
      console.log("Total incoming network latency: " + incomingLatency + "ms")
      console.log("Total round trip latency: " + roundtripLatency + "ms")
    }
  })