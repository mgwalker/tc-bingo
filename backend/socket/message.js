import broadcast from "./broadcast.js";
import { add, get, getAllStates } from "../server/clients.js";
import bingo from "../bingo.js";

export default (socket, msg) => {
  const message = JSON.parse(msg);

  switch (message.action) {
    case "join":
      {
        const id = (Math.random() + 1).toString(36).slice(2);

        const grid = [
          [1, 2, 3, 4, 5],
          [6, 7, 8, 9, 10],
          [11, 12, 13, 14, 15],
          [16, 17, 18, 19, 20],
          [21, 22, 23, 24, 25],
        ];

        const state = [
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
        ];

        add(socket, { ...message.data, id, grid, state });
        broadcast(message, { exclude: socket });
        broadcast(
          { action: "add-opponent-state", data: { id, state } },
          { exclude: socket },
        );

        socket.send(
          JSON.stringify({
            action: "set-grid",
            data: grid,
          }),
        );

        const opponentStates = getAllStates()
          .filter(({ socket: client }) => client != socket)
          .map(({ id, state }) => ({
            id,
            state,
          }));

        socket.send(
          JSON.stringify({ action: "opponent-states", data: opponentStates }),
        );
      }
      break;

    case "update-state":
      {
        const client = get(socket);
        client.state = message.data;

        broadcast(
          {
            action: "update-opponent",
            data: { id: client.id, state: message.data },
          },
          { exclude: socket },
        );

        if (bingo(client.state)) {
          broadcast(
            {
              action: "winner",
              data: { id: client.id, username: client.username },
            },
            { exclude: socket },
          );

          socket.send(
            JSON.stringify({
              action: "you-win",
              data: {},
            }),
          );
        }
      }
      break;

    default:
      console.log("unhandled message:");
      console.log(message);
      break;
  }
};
