import { describe, it, expect, vi, Mock } from 'vitest';
import { Request, Response } from 'express';
import { submitReactionTimeController, getReactionTimesController } from '../src/controllers/timerController';
import * as timerService from '../src/services/timerService';

vi.mock('../src/services/timerService');

describe('Timer Controller', () => {
  it('should submit a reaction time', async () => {
    const req = {
      body: { user_id: 'userId', time: 123 },
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const mockSubmitReactionTime = timerService.submitReactionTime as Mock;
    mockSubmitReactionTime.mockResolvedValueOnce({ user_id: 'userId', time: 123 });

    const next = vi.fn();
    await submitReactionTimeController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user_id: 'userId', time: 123 });
  });

  it('should get reaction times', async () => {
    const req = {
      params: { userId: 'userId' },
      query: { sort: 'time', filter: '{}' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const mockGetReactionTimes = timerService.getReactionTimes as Mock;
    mockGetReactionTimes.mockResolvedValueOnce([{ time: 123 }, { time: 456 }]);

    await getReactionTimesController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ time: 123 }, { time: 456 }]);
  });
});