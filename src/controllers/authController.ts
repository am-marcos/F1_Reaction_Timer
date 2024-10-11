import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const newUser = await registerUser(email, password, role);
    res.status(201).json(newUser);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};