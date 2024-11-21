import { WebSocket } from "ws";

let server;

export default (message, { exclude = [] } = {}) => {
  if (!server) {
    return;
  }

  if (!Array.isArray(exclude)) {
    exclude = [exclude];
  }

  server.clients.forEach((client) => {
    if (!exclude.includes(client) && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

export const setServer = (wsServer) => {
  server = wsServer;
};
