import * as State from './gameState.js';
import * as UI from './uiHandlers.js';

export function startGame() {
  State.setClicks(0);
  State.setTimeLeft(5);
  State.setGameActive(true);

  UI.updateDisplay();
  UI.setButtonToGameMode();
  UI.removeTimerWarning();

  startTimer();
}

function startTimer() {
  const timer = setInterval(() => {
    State.decrementTimeLeft();
    UI.updateDisplay();

    if (State.getTimeLeft() <= 10) {
      UI.addTimerWarning();
    }

    if (State.getTimeLeft() <= 0) {
      endGame();
    }
  }, 1000);

  State.setTimer(timer);
}

export function handleClick() {
  if (!State.isGameActive()) {
    startGame();
    return;
  }

  State.incrementClicks();
  UI.updateDisplay();
  UI.animateClickButton();
}

export function endGame() {
  State.clearGameTimer();
  State.setGameActive(false);

  UI.disableClickButton();
  UI.removeTimerWarning();

  UI.showGameOverModal(State.getClicks());
}
