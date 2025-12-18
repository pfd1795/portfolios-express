const API_ENDPOINTS = {
  SUBMIT_SCORE: '/game/api/submit-score',
  LEADERBOARD: '/game/api/leaderboard'
};

export async function submitScore(nickname, clicks) {
  const response = await fetch(API_ENDPOINTS.SUBMIT_SCORE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nickname, clicks })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function fetchLeaderboard() {
  const response = await fetch(API_ENDPOINTS.LEADERBOARD);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
