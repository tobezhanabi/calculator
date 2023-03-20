const blueRadio = document.querySelector("input[value='blue']");
const lightRadio = document.querySelector("input[value='light']");
const violetRadio = document.querySelector("input[value='violet']");
const body = document.querySelector("body");

blueRadio.addEventListener("click", () => {
  body.classList.add("theme-blue");
  body.classList.remove("theme-light");
  body.classList.remove("theme-violet");
});

lightRadio.addEventListener("click", () => {
  body.classList.add("theme-light");
  body.classList.remove("theme-violet");
  body.classList.remove("theme-blue");
});

violetRadio.addEventListener("click", () => {
  body.classList.add("theme-violet");
  body.classList.remove("theme-blue");
  body.classList.remove("theme-light");
});
