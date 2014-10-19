// Koa and app
var koa = require('koa')
var app = koa()

// Latency Header Middleware
var latency = require('./koa-latency-headers')

// Demo Middleware
var demo = require('./demo')
 
// Set the x-request-received header
app.use(latency.requestReceived)

// Simulate processing delay 
app.use(demo.processingDelay)

// Create the demo response body
app.use(demo.helloWorld)
 
// Set the x-response-sent header
app.use(latency.responseSent)

// Listen for incoming requests
app.listen(1337)
