import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'El nickname es requerido'],
    trim: true,
    minlength: [2, 'El nickname debe tener al menos 2 caracteres'],
    maxlength: [20, 'El nickname no puede tener más de 20 caracteres'],
    index: true
  },
  clicks: {
    type: Number,
    required: [true, 'La cantidad de clicks es requerida'],
    min: [0, 'Los clicks no pueden ser negativos'],
    max: [1000, 'Cantidad de clicks sospechosa'],
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true,
  collection: 'scores'
});

scoreSchema.index({ clicks: -1, timestamp: -1 });

scoreSchema.statics.createScore = async function (nickname, clicks) {
  const score = new this({
    nickname: nickname.trim(),
    clicks: parseInt(clicks)
  });

  return await score.save();
};

scoreSchema.statics.getTopScores = async function (limit = 10) {
  return await this
    .find({})
    .sort({ clicks: -1, timestamp: 1 })
    .limit(limit)
    .select('nickname clicks timestamp')
    .lean();
};

scoreSchema.statics.getPlayerRank = async function (clicks) {
  const count = await this.countDocuments({ clicks: { $gt: clicks } });
  return count + 1;
};

const Score = mongoose.model('Score', scoreSchema);

export default Score;

export const createScore = (nickname, clicks) => Score.createScore(nickname, clicks);
export const getTopScores = (limit) => Score.getTopScores(limit);
export const getPlayerRank = (clicks) => Score.getPlayerRank(clicks);
