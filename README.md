# Latency-Headers-PoC

Run the proof of concept by downloading the files, going to the directory and running `npm start`. 

Here's a one liner:

`git clone git@github.com:montanaflynn/Latency-Headers-PoC.git; cd Latency-Headers-PoC; npm start`

Basically there are two headers introduced in this proof of concept. 

- `x-request-received` is set by the server with the timestamp of when the request was received
- `x-response-sent` is set by the server with the timestamp of when the response was sent

With these headers in place client can determine the following:

**outgoing network latency** is the time from the client sending the request until being received by the server
**server processing latency** is the time from the server getting the request until sending the response
**incoming network latency** is the time from the server sending the response until being received by the client
**total round trip latency** is the time from the client sending the request until a response back from the server