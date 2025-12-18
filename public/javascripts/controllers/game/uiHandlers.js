import { getClicks, getTimeLeft } from './gameState.js';
import { ModalDialog, CloseModalDialog } from '../../utils/dialog.js';

const clickButton = document.getElementById('clickButton');
const clickCounter = document.getElementById('clickCounter');
const timerDisplay = document.getElementById('timer');


export function updateDisplay() {
  clickCounter.textContent = getClicks();
  timerDisplay.textContent = getTimeLeft();
}

export function showGameOverModal(finalScore) {
  const template = document.getElementById('modalDialogTemplate');
  if (!template) return;

  const content = template.content.cloneNode(true);
  const scoreEl = content.querySelector('#modalScore');
  if (scoreEl) scoreEl.textContent = finalScore;

  ModalDialog(content);

  setTimeout(() => {
    const input = document.getElementById('nicknameInput');
    if (input) input.focus();
  }, 50);
}

export function hideModal() {
  CloseModalDialog();
  setButtonToStartMode();
}

export function showError(message) {
  const el = document.getElementById('errorMessage');
  if (el) {
    el.textContent = message;
    el.classList.add('show');
  }
}

export function hideError() {
  const el = document.getElementById('errorMessage');
  if (el) {
    el.classList.remove('show');
  }
}

export function setButtonToGameMode() {
  clickButton.textContent = "¡CLICK!";
  clickButton.classList.add('active');
  clickButton.disabled = false;
}

export function setButtonToStartMode() {
  clickButton.textContent = "Iniciar Juego";
  clickButton.classList.remove('active');
  clickButton.disabled = false;

  clickButton.style.setProperty('--click-gradient', 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-cyan-dark) 100%)');
}

export function disableClickButton() {
  clickButton.disabled = true;
  clickButton.classList.remove('active');
}

export function addTimerWarning() {
  timerDisplay.classList.add('warning');
}

export function removeTimerWarning() {
  timerDisplay.classList.remove('warning');
}

const colors = [
  ['--color-blue', '--color-cyan-dark'],
  ['--color-green', '--color-emerald-dark'],
  ['--color-red', '--color-pink-dark'],
  ['--color-yellow', '--color-orange-dark'],
  ['--color-purple', '--color-indigo-dark'],
  ['--color-pink', '--color-red-dark'],
  ['--color-cyan', '--color-blue-dark'],
  ['--color-orange', '--color-red-light']
];

function getRandomGradient() {
  const [color1, color2] = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(135deg, var(${color1}) 0%, var(${color2}) 100%)`;
}

export function animateClickButton() {
  const gradient = getRandomGradient();
  clickButton.style.setProperty('--click-gradient', gradient);

  clickButton.style.transform = 'scale(0.95)';
  setTimeout(() => {
    clickButton.style.transform = 'scale(1)';
  }, 100);
}

export function setSubmitButtonLoading(loading) {
  const el = document.getElementById('submitScore');
  if (el) {
    el.disabled = loading;
    el.textContent = loading ? 'Guardando...' : 'Guardar Puntuación';
  }
}
