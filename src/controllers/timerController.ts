import { NextFunction, Request, Response } from 'express';
import { submitReactionTime, getReactionTimes } from '../services/timerService';

export const submitReactionTimeController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(req.body);
    const { user_id, time } = req.body;
    try {
        const message = await submitReactionTime(user_id, time);
        res.status(201).send(message);
    } catch (err) {
        next(err);
    }
};

export const getReactionTimesController = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { sort, filter } = req.query;

    try {
        const reactionTimes = await getReactionTimes(userId, sort as string, filter);
        res.json(reactionTimes);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
};
