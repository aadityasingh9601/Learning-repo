"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
//First of all create an http server. As under the hood of websockets, it's an http server.
const server = http_1.default.createServer(function (request, response) {
    console.log(new Date() + "Request received for" + request.url);
    response.end("Hi there");
});
//Here ws/socket is a web socket instance.
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function message(data, isBinary) {
        console.log(data);
        //Broadcasting the message data to everyone.
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                //{binary:isBinary} ensures that data is sent as a string, not as a blob.Read more on docs.
                client.send(data, { binary: isBinary });
            }
        });
    });
});
server.listen(8080, () => {
    console.log("Server listening on port 8080");
});
