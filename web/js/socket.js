import { initializeCard, youWin } from "./bingo.js";
import {
  addOpponentState,
  initializeOpponents,
  opponentWins,
  removeOpponent,
  updateOpponent,
} from "./opponents.js";

class WS extends WebSocket {
  constructor(...args) {
    super(...args);

    this.send = this.send.bind(this);
  }

  send(message) {
    super.send(JSON.stringify(message));
  }
}

const handle = (message) => {
  switch (message.action) {
    case "set-grid":
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

    case "you-win":
      youWin();
      break;

    case "winner":
      opponentWins(message.data);
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
    handle(JSON.parse(msg.data));
  });
};
