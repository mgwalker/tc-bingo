const clients = new Map();

export const add = (socket, metadata) => {
  clients.set(socket, metadata);
};

export const get = (socket) => clients.get(socket);

export const getAllStates = () => {
  return Array.from(clients.entries()).map(([socket, { id, state }]) => ({
    socket,
    id,
    state,
  }));
};

export const remove = (socket) => {
  clients.delete(socket);
};
