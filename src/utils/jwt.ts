import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    console.log(SECRET_KEY);

    return jwt.verify(token, SECRET_KEY);
};
