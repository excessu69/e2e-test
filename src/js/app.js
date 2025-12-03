import { counterFunc } from "./counterFunc.js";

const btn = document.querySelector('input[type="button"]');
const counter = document.querySelector(".counter");

btn.addEventListener("click", () => {
  const num = +counter.textContent;
  counterFunc(counter, num);
});
