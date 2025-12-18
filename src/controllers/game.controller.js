import { createScore, getTopScores, getPlayerRank } from '../models/score.model.js';
import { validateScoreData } from '../utils/validation.utils.js';
import { sendSuccess, sendError, sendValidationError } from '../utils/response.utils.js';

export async function renderGame(req, res) {
  try {
    const topScores = await getTopScores(10);
    res.render('game', {
      title: 'Clicker Game',
      leaderboard: topScores
    });
  } catch (error) {
    console.error('Error rendering game:', error);
    res.status(500).render('error', {
      message: 'Error al cargar el juego',
      error: req.app.get('env') === 'development' ? error : {}
    });
  }
}

async function savePlayerScore(scoreData) {
  await createScore(scoreData.nickname, scoreData.clicks);
  const rank = await getPlayerRank(scoreData.clicks);

  return {
    rank,
    clicks: scoreData.clicks
  };
}

export async function submitScore(req, res) {
  try {
    const { nickname, clicks } = req.body;

    const validation = validateScoreData({ nickname, clicks });

    if (!validation.isValid) {
      return sendValidationError(res, validation.errors);
    }

    const result = await savePlayerScore(validation.validData);

    sendSuccess(res, {
      message: 'Puntuación guardada exitosamente',
      rank: result.rank,
      clicks: result.clicks
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    sendError(res, 'Error al guardar la puntuación');
  }
}

export async function getLeaderboard(req, res) {
  try {
    const topScores = await getTopScores(10);
    sendSuccess(res, { leaderboard: topScores });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    sendError(res, 'Error al obtener el ranking');
  }
}
