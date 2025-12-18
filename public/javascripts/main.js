import HomeController from './controllers/home/home.controller.js';
import GameController from './controllers/game/game.controller.js';

function main() {

  if (document.getElementById("HomePage")) {
    HomeController();
  }

  if (document.getElementById("GamePage")) {
    GameController();
  }

  console.log('Clicker Game initialized successfully');
}

document.addEventListener('DOMContentLoaded', main);
