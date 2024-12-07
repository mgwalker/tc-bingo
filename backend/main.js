import { WebSocketServer } from "ws";
import Client from "./client.js";

const port = process.env.PORT ?? 8080;

const server = new WebSocketServer({ host: "0.0.0.0", port });

server.on("connection", (socket) => {
  new Client(socket);
});
