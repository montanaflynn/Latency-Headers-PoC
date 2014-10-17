var koa = require('koa')
var app = koa()
 
// Make it easy to pkill from npm
process.title = "latencyPoC"
 
// Set the x-request-received header
app.use(function *(next){
  var timestamp = new Date().getTime()
  this.set('x-request-received', timestamp)
  yield next
})
 
// Simulate processing time
app.use(function *(next){
  function process() {
    var timeout = Math.floor((Math.random() * 50) + 10);
    return function (cb) {
      setTimeout(cb, timeout)
    }
  }
  yield process()
  yield next
})
 
// Send the response
app.use(function *(){

  // Just for fun and the demo
  this.set('x-powered-by', 'magic')
  this.body = 'Hello World'

  // Set the x-response-sent header
  var timestamp = new Date().getTime()
  this.set('x-response-sent', timestamp)
})
 
app.listen(1337)