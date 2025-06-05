import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateGameToken = (sessionId: string) => {
  const payload = {
    sessionId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 2 * 60,
  };

  return jwt.sign(payload, JWT_SECRET);
};

export const verifyGameToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      sessionId: string;
      iat: number;
      exp: number;
    };
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, reason: (err as Error).message };
  }
};
