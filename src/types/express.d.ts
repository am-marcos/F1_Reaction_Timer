import { Request } from 'express';

interface RequestAuth extends Request {
    user?: any;
}
