import connect from "./socket.js";

const start = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("input").value;
    connect(name);
    form.remove();

    document.querySelector(".container").classList.toggle("hidden");
  });
};

document.addEventListener("DOMContentLoaded", start);
