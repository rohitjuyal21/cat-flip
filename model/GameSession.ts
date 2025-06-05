import { Schema, Document, models, model } from "mongoose";

export interface IGameSession extends Document {
  sessionId: string;
  ip: string;
  userAgent: string;
  startedAt: Date;
  score: number;
  flips: number;
  completed: boolean;
  endedAt: Date;
  timeTaken: number;
}

const GameSessionSchema = new Schema<IGameSession>({
  sessionId: { type: String, required: true, unique: true },
  ip: String,
  userAgent: String,
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  score: { type: Number, default: 0 },
  flips: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  timeTaken: { type: Number },
});

export const GameSession =
  models.GameSession || model<IGameSession>("GameSession", GameSessionSchema);
