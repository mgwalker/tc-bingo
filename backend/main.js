import { WebSocketServer } from "ws";
// import broadcast, { setServer } from "./socket/broadcast.js";
// import message from "./socket/message.js";
// import { get, remove } from "./server/clients.js";
import Client from "./Client.js";

const port = process.env.PORT ?? 8080;

const server = new WebSocketServer({ host: "0.0.0.0", port });
// setServer(server);

server.on("connection", (socket) => {
  new Client(socket);
  // socket.on("message", (msg) => message(socket, msg));

  // socket.on("close", () => {
  //   const client = get(socket);
  //   broadcast(
  //     {
  //       action: "leave",
  //       data: { username: client.username, id: client.id },
  //     },
  //     { exclude: socket },
  //   );
  //   remove(socket);
  // });
});
