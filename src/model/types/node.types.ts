import { Types } from 'mongoose';
import { Task } from './task.types';
export interface Node {
    _id: Types.ObjectId;
    parentId?: string;
    children?: Node[];
    data?: Task[]
    info?: { title?: string, icon?: string };
}