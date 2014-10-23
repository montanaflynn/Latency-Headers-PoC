// Koa and app
var koa = require('koa')
var app = koa()

// Latency Header Middleware
var latencyHeaders = require('koa-latency-headers')
 
// Set the x-request-received header
app.use(latencyHeaders())

// Send the response body
app.use(function *(next){

  // Simulate processing delay
  yield (function() {
    var timeout = Math.floor((Math.random() * 25) + 25);
    return function (cb) {
      setTimeout(cb, timeout)
    }
  })()

  // Obligatory hello world
  this.body = 'Hello World'
  
})

// Listen for incoming requests
app.listen(1337)
