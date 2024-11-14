import { describe, it, expect, vi, Mock } from 'vitest';
import Timer, { ITimer } from '../src/models/timerModel';
import { submitReactionTime, getReactionTimes } from '../src/services/timerService';
import mongoose from 'mongoose';

vi.mock('../src/models/timerModel', () => ({
  default: {
    create: vi.fn(),
    find: vi.fn(),
  },
}));

describe('Timer Service', () => {
  it('should submit a reaction time', async () => {
    const mockCreate = Timer.create as Mock;
    const mockTimer: Partial<ITimer> = { user_id: new mongoose.Types.ObjectId('userId'), time: 123 };
    mockCreate.mockResolvedValueOnce(mockTimer);

    const result = await submitReactionTime('userId', 123);
    expect(result).toEqual(mockTimer);
    expect(mockCreate).toHaveBeenCalledWith({ user_id: new mongoose.Types.ObjectId('userId'), time: 123 });
  });

  it('should get reaction times', async () => {
    const mockFind = Timer.find as Mock;
    const mockTimers: Partial<ITimer>[] = [{ time: 123 }, { time: 456 }];
    mockFind.mockReturnValueOnce({
      select: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      sort: vi.fn().mockReturnThis(),
      exec: vi.fn().mockResolvedValueOnce(mockTimers),
    });

    const result = await getReactionTimes('userId', 'time', {});
    expect(result).toEqual(mockTimers);
    expect(mockFind).toHaveBeenCalledWith({ user_id: 'userId' });
  });
});