var express = require('express')
var latencyHeaders = require('express-latency-headers')
var app = express()

app.use(latencyHeaders())

app.use(function(req, res, next) {
  setTimeout(function(){
    res.send('Hello World!')
  },1000)
})

var server = app.listen(3000)
