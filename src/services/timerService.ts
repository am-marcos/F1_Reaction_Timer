import Timer, { ITimer } from '../models/timerModel';

export const submitReactionTime = async (user_id: string, time: number): Promise<ITimer> => {
  const reactionTime = new Timer({ user_id, time });
  return await reactionTime.save();
};

export const getReactionTimes = async (user_id: string, sort: string, filter: any): Promise<ITimer[]> => {
    const query = Timer.find({ user_id });
  
    if (filter) {
      query.where(filter);
    }
  
    if (sort) {
      query.sort(sort);
    }
  
    return await query.populate('user_id').exec();
};