# Latency-Headers-PoC

### Explaination

Basically there are two headers introduced in this proof of concept:

- `x-request-received` is set by the server with the timestamp of when the request was received
- `x-response-sent` is set by the server with the timestamp of when the response was sent

With these headers in place the client can then determine the following:

- **outgoing network latency**: time between client sending the request and server receiving it
- **server processing latency**: time between server receiving the request and sending the response
- **incoming network latency**: time between server sending the response and client receiving it
- **total round trip latency**: time between client sending the request and receiving response

### Try it out yourself

```shell
git clone git@github.com:montanaflynn/Latency-Headers-PoC.git
cd Latency-Headers-PoC
npm start
```


