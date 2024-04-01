import jwt from "jsonwebtoken";

import { env } from "@acme/auth/env";
import { type UserSelect } from "@acme/db";

export const createToken = async (user: UserSelect) => {
  const secret = env.AUTH_SECRET as string;

  const payload = {
    userId: user.id,
    name: user.name,
    level: user.level,
    experience: user.experience,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: "7d",
  });

  return token;
};

export const refreshToken = async (token: string) => {
  const secret = env.AUTH_SECRET as string;

  const payload = jwt.verify(token, secret) as {
    userId: string;
    name: string;
    level: number;
    experience: number;
  };

  const newToken = jwt.sign(payload, secret, {
    expiresIn: "7d",
  });

  return newToken;
};
