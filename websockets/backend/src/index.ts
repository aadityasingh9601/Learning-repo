import { WebSocketServer, WebSocket } from "ws";
import http from "http";

//First of all create an http server. As under the hood of websockets, it's an http server.
const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + "Request received for" + request.url);
  response.end("Hi there");
});

//Here ws/socket is a web socket instance.

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    console.log(data);
    //Broadcasting the message data to everyone.
    //wss.clients contains all current connected clients.
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        //{binary:isBinary} ensures that data is sent as a string, not as a blob.Read more on docs.
        client.send(data, { binary: isBinary });
      }
    });
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
