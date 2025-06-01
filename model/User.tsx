import { Document, model, models, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  score: number;
  timeTaken: number;
  timeLeft: number;
  isWin: boolean;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    timeLeft: { type: Number, required: true },
    isWin: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const User = models.User || model<User>("User", userSchema);
