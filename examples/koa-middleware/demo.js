module.exports = {
	// The obligatory hellow world example
	helloWorld : function *(next){
	  this.body = 'Hello World'
	  yield next
	},
	// Simulate processing time between 25-50ms
	processingDelay : function *(next){
	  function process() {
	    var timeout = Math.floor((Math.random() * 50) + 25);
	    return function (cb) {
	      setTimeout(cb, timeout)
	    }
	  }
	  yield process()
	  yield next
	}
}
