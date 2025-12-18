import { handleClick } from './gameLogic.js';
import { updateLeaderboard } from './leaderboard.js';
import { submitScore as submitScoreAPI } from './apiClient.js';
import * as UI from './uiHandlers.js';
import { getClicks } from './gameState.js';

function validateNickname(nickname) {
  if (!nickname) {
    return { valid: false, error: 'Por favor ingresa un nickname' };
  }

  if (nickname.length > 20) {
    return { valid: false, error: 'El nickname es muy largo (máximo 20 caracteres)' };
  }

  return { valid: true };
}

async function handleScoreSubmit(event) {
  event.preventDefault();

  const nicknameInput = document.getElementById('nicknameInput');
  const nickname = nicknameInput ? nicknameInput.value.trim() : '';

  const validation = validateNickname(nickname);
  if (!validation.valid) {
    UI.showError(validation.error);
    return;
  }

  UI.setSubmitButtonLoading(true);

  try {
    const data = await submitScoreAPI(nickname, getClicks());

    if (data.success) {
      UI.hideModal();
      await updateLeaderboard();

      alert(`¡Puntuación guardada! Estás en el puesto #${data.rank}`);
    } else {
      UI.showError(data.message || 'Error al guardar puntuación');
    }
  } catch (error) {
    console.error('Error:', error);
    UI.showError('Error de conexión. Intenta nuevamente.');
  } finally {
    UI.setSubmitButtonLoading(false);
  }
}

export default function GameController() {
  document.getElementById('clickButton').addEventListener('click', handleClick);

  document.addEventListener('submit', (event) => {
    if (event.target && event.target.id === 'scoreForm') {
      handleScoreSubmit(event);
    }
  });

  updateLeaderboard();
}
