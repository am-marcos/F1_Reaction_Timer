import jwt from 'jsonwebtoken';
import { jwtSecret } from '../configs/config';

// Générer un jeton JWT
export const generateToken = (id: string, role: boolean): string => {
  return jwt.sign({ id, role }, jwtSecret, { expiresIn: '1h' });
};

// Vérifier un jeton JWT
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error('Invalid token');
  }
};