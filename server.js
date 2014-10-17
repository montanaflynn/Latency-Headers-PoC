var koa = require('koa')
var app = koa()
 
// Make it easy to kill from npm
process.title = "latencyPoC"
 
// Set network latency headers
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
  var timestamp = new Date().getTime()
  this.set('x-powered-by', 'magic')
  this.set('x-response-sent', timestamp)
  this.body = 'Hello World'
})
 
app.listen(1337)