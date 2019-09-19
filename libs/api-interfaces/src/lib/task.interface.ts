import { Document } from 'mongoose';

export interface TaskDto {
  id?: any;
  title: string;
  description: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task extends TaskDto, Document {
}
