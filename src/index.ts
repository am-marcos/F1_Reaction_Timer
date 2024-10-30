import express from 'express';
import { connectDB } from './configs/connectionDB';
import authRoutes from './routes/authRoute';
import timerRoutes from './routes/timerRoute';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/reaction-time', timerRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});