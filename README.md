# Latency-Headers-PoC

### Explaination

Basically there are two headers introduced in this proof of concept:

- `x-request-received` is set by the server with the timestamp of when the request was received

- `x-response-sent` is set by the server with the timestamp of when the response was sent

With these headers in place the client can then determine the following:

- **outgoing network latency**: time from the client sending the request to being received by the server

- **server processing latency**: time from the server getting the request to sending the response

- **incoming network latency**: time from the server sending the response to being received by the client

- **total round trip latency**: time from the client sending the request to a response back from the server

### Try it out yourself

```shell
git clone git@github.com:montanaflynn/Latency-Headers-PoC.git
cd Latency-Headers-PoC
npm start
```