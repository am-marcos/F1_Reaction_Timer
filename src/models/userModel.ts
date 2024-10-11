import mongoose, { Document, Schema } from 'mongoose';

// Interface pour le document utilisateur
interface IUser extends Document {
  email: string;
  password: string;
  role: boolean; 
  _id: string;
}

// Schéma utilisateur
const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Boolean, required: true }
});

// Modèle utilisateur
const User = mongoose.model<IUser>('User', userSchema);

export default User;
export { IUser };