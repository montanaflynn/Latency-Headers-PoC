# Latency Headers Standard PoC

### Explanation

Basically the server returns headers that the client can use to determine the latency.

The server adds these two http response headers:

- `x-request-received` is set by the server with the timestamp of when the request was received
- `x-response-sent` is set by the server with the timestamp of when the response was sent

The client can use these headers to determine the following:

- **outgoing network latency**: time between client sending the request and server receiving it
- **server processing latency**: time between server receiving the request and sending the response
- **incoming network latency**: time between server sending the response and client receiving it
- **total round trip latency**: time between client sending the request and receiving response

### Try it out

An example server and client is included in this repo so this works:

```shell
git clone git@github.com:montanaflynn/Latency-Headers-PoC.git
cd Latency-Headers-PoC
npm start
```

That should return something like this:

    =================================================
    Latency Benchmarks:
    Total outgoing network latency: 12ms
    Total processing time latency: 55ms
    Total incoming network latency: 4ms
    Total round trip latency: 71ms
    =================================================

#### Server Examples

- [Standard Node.js](https://github.com/montanaflynn/Latency-Headers-PoC/blob/master/examples/node-standard-http/index.js)
- [Koa Middleware](https://github.com/montanaflynn/Latency-Headers-PoC/tree/master/examples/koa-middleware)
- [Express Middleware](https://github.com/montanaflynn/Latency-Headers-PoC/tree/master/examples/express-middleware)

#### Client Examples

- [Node.js](https://github.com/montanaflynn/Latency-Headers-PoC/blob/master/client.js)

### Todos

- Create proper spec and RFC
- <del>Middleware examples for expressjs / koa / etc...</del>
- Have a list of APIs that you can test
