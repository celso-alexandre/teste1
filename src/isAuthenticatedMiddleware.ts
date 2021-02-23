import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
   iat: number
   exp: number
   username: string;
}

interface IAuthenticatedRequest extends Request {
   user: {
      username: string
   }
}

export default async function isAuthenticatedMiddleware(
  request: Request, response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(400).json({ message: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      return response.status(400).json({ message: 'JWT not provided' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return response.status(500).json({ message: 'JWT secret not configured' });
    }

    try {
      const decoded = verify(token, secret);

      const { username } = decoded as TokenPayload;

      request.username = username;

      if (!decoded) {
        return response.status(400).json({ message: 'Invalid JWT' });
      }

      return next();
    } catch (err) {
      return response.status(400).json({ message: 'Invalid JWT' });
    }
  } catch (err) {
    return response.status(400).json({ message: 'JWT Token validation failed' });
  }
}
