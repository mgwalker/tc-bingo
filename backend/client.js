import { WebSocket } from "ws";
import { getBoard, isBingo } from "./game.js";

const clients = new Map();

export default class Client {
  #socket;
  #pingTimer;
  #alive;

  constructor(socket) {
    this.#alive = true;
    this.#socket = socket;

    this.#pingTimer = setInterval(() => {
      if (!this.#alive) {
        console.log(clients.get(this).id, "did not pong");
        return this.#socket.terminate();
      }

      this.#alive = false;
      this.#socket.ping();
    }, 10_000);

    this.#socket.on("pong", () => {
      this.#alive = true;
    });

    this.#socket.on("close", () => {
      console.log(clients.get(this).id, "has closed");
      Client.#broadcast({
        action: "leave",
        data: { id: clients.get(this).id },
      });
      clearInterval(this.#pingTimer);
    });

    this.#socket.on("message", this.#handleMessage.bind(this));
  }

  static #broadcast(message, { exclude = [] } = {}) {
    if (!Array.isArray(exclude)) {
      exclude = [exclude];
    }

    clients.keys().forEach((client) => {
      if (
        !exclude.includes(client) &&
        client.#socket.readyState === WebSocket.OPEN
      ) {
        client.#send(message);
      }
    });
  }

  #send(message) {
    this.#socket.send(JSON.stringify(message));
  }

  async #join(data) {
    const id = (Math.random() + 1).toString(36).slice(2);

    const board = await getBoard();
    clients.set(this, { ...data, id, board });

    Client.#broadcast(
      { action: "add-opponent-state", data: { id, state: board.state } },
      { exclude: this },
    );

    this.#send({ action: "set-id", data: id });

    this.#send({
      action: "set-squares",
      data: board,
    });

    const opponentStates = Array.from(clients)
      .filter(
        ([client]) =>
          client !== this && client.#socket.readyState === WebSocket.OPEN,
      )
      .map(
        ([
          ,
          {
            id,
            board: { state },
          },
        ]) => ({ id, state }),
      );

    this.#send({ action: "opponent-states", data: opponentStates });
  }

  #updateState(data) {
    const client = clients.get(this);
    client.board.state = data;

    Client.#broadcast(
      {
        action: "update-opponent",
        data: { id: client.id, state: data },
      },
      { exclude: this },
    );

    if (isBingo(client.board.state)) {
      Client.#broadcast({
        action: "winner",
        data: { id: client.id, username: client.username },
      });
    }
  }

  #handleMessage(msg) {
    const message = JSON.parse(msg);

    switch (message.action) {
      case "join":
        return this.#join(message.data);

      case "update-state":
        return this.#updateState(message.data);

      default:
        console.log("unhandled message:");
        console.log(message);
        break;
    }
  }
}
