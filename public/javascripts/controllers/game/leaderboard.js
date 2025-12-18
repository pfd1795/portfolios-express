import { fetchLeaderboard } from './apiClient.js';

function getRankClass(index) {
  if (index === 0) return 'gold';
  if (index === 1) return 'silver';
  if (index === 2) return 'bronze';
  return '';
}

function createLeaderboardRow(score, index) {
  const row = document.createElement('tr');
  const rankClass = getRankClass(index);

  row.innerHTML = `
    <td class="rank ${rankClass}">${index + 1}</td>
    <td class="nickname">${score.nickname}</td>
    <td class="score">${score.clicks}</td>
  `;

  return row;
}

export function renderLeaderboard(leaderboard) {
  const leaderboardBody = document.getElementById('leaderboardBody');
  leaderboardBody.innerHTML = '';

  if (!leaderboard || leaderboard.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `
      <td colspan="3">
        No hay puntuaciones aún. ¡Sé el primero!
      </td>
    `;
    leaderboardBody.appendChild(emptyRow);
    return;
  }

  leaderboard.forEach((score, index) => {
    const row = createLeaderboardRow(score, index);
    leaderboardBody.appendChild(row);
  });
}

export async function updateLeaderboard() {
  try {
    const data = await fetchLeaderboard();

    if (data.success) {
      renderLeaderboard(data.leaderboard);
    }
  } catch (error) {
    console.error('Error al actualizar ranking:', error);
  }
}
