import mongoose, { Document, Schema } from 'mongoose';

// Interface pour le document Timer
interface ITimer extends Document {
  user_id: mongoose.Types.ObjectId;
  time: number;
}

// Schéma Timer
const timerSchema: Schema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: Number, required: true }
});

// Modèle Timer
const Timer = mongoose.model<ITimer>('Timer', timerSchema);

export default Timer;
export { ITimer };