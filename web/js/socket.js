import { initializeCard } from "./bingo.js";
import {
  addOpponentState,
  initializeOpponents,
  opponentWins,
  removeOpponent,
  updateOpponent,
} from "./opponents.js";

class WS extends WebSocket {
  #id;

  constructor(...args) {
    super(...args);

    this.send = this.send.bind(this);
  }

  send(message) {
    super.send(JSON.stringify(message));
  }

  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
  }
}

const handle = (message, socket) => {
  switch (message.action) {
    case "set-id":
      socket.id = message.data;
      break;

    case "set-squares":
      initializeCard(message.data);
      break;

    case "opponent-states":
      initializeOpponents(message.data);
      break;

    case "add-opponent-state":
      addOpponentState(message.data);
      break;

    case "update-opponent":
      updateOpponent(message.data);
      break;

    case "leave":
      removeOpponent(message.data.id);
      break;

    case "winner":
      opponentWins(message.data, socket);
      break;

    default:
      console.log("unhandled:");
      console.log(message);
      break;
  }
};

let ws;

export const getSocket = () => ws;

export default (name) => {
  ws = new WS("/ws/");
  ws.addEventListener("open", () => {
    ws.send({ action: "join", data: { username: name } });
  });

  ws.addEventListener("message", (msg) => {
    const message = JSON.parse(msg.data);
    handle(message, ws);
  });
};
