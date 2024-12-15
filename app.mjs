import { showButtons } from "./src/js/auth/showButtons.js";
import { setupLogoutBtn } from "./src/js/auth/logout.js";

showButtons();
setupLogoutBtn();

var burgerButton = document.getElementById('burger-menu-button');
var overlay = document.getElementById('burger-menu');
burgerButton.addEventListener('click',function(){
  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
});