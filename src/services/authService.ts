import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const registerUser = async (email: string, password: string, role: boolean): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role });
  return await user.save();
};

export const loginUser = async (email: string, password: string): Promise<string | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return generateToken(user._id.toString(), user.role);
};