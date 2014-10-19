module.exports = {
	// Set the x-request-received header
	requestReceived : function *(next){
		var timestamp = new Date().getTime()
		this.set('x-request-received', timestamp)
		yield next
	},
    // Set the x-response-sent header
	responseSent : function *(next){
		var timestamp = new Date().getTime()
		this.set('x-response-sent', timestamp)
		yield next
	}
}
