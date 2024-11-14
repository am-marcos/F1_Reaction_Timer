import request from 'supertest';
import express from 'express';
import timerRoutes from '../src/routes/timerRoute';
import { setupSwagger } from '../src/swaggerConfig';
import { vi } from 'vitest';

vi.mock('../src/configs/connectionDB');
vi.mock('../src/middleware/authMiddleware', () => ({
  authMiddleware: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use('/api/reaction-time', timerRoutes);
setupSwagger(app);

describe('Timer Routes', () => {
  it('should submit a reaction time', async () => {
    const response = await request(app)
      .post('/api/reaction-time/submit-reaction-time')
      .send({ user_id: 'userId', time: 123 })
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ user_id: 'userId', time: 123 });
  });

  it('should get reaction times', async () => {
    const response = await request(app)
      .get('/api/reaction-time/get-reaction-time/userId')
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ time: 123 }, { time: 456 }]);
  });
});