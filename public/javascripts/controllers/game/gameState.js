const gameState = {
  clicks: 0,
  timeLeft: 10,
  gameActive: false,
  timer: null
};

export function getClicks() {
  return gameState.clicks;
}

export function setClicks(value) {
  gameState.clicks = value;
}

export function incrementClicks() {
  gameState.clicks++;
}

export function getTimeLeft() {
  return gameState.timeLeft;
}

export function setTimeLeft(value) {
  gameState.timeLeft = value;
}

export function decrementTimeLeft() {
  gameState.timeLeft--;
}

export function isGameActive() {
  return gameState.gameActive;
}

export function setGameActive(value) {
  gameState.gameActive = value;
}

export function getTimer() {
  return gameState.timer;
}

export function setTimer(value) {
  gameState.timer = value;
}

export function clearGameTimer() {
  if (gameState.timer) {
    clearInterval(gameState.timer);
    gameState.timer = null;
  }
}

export function resetGameState() {
  gameState.clicks = 0;
  gameState.timeLeft = 5;
  gameState.gameActive = false;
  clearGameTimer();
}
