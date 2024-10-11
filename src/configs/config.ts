import dotenv from 'dotenv';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

export const port = process.env.PORT || 3000;
export const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';