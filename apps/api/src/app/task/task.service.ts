import { Injectable } from '@angular/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDto } from '@emafeed/api-interfaces';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>
  ) { }

  async create(taskDto: TaskDto): Promise<Task> {
    const task = new this.taskModel(taskDto);
    return task.save();
  }

  async get(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async update(id: string, taskDto: TaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, taskDto).exec();
  }

  async delete(id: string): Promise<void> {
    return this.taskModel.deleteOne({ _id: id }).exec().then((res) => {
      if (res.deletedCount !== 1) {
        throw new InternalServerErrorException({
          message: `Expected to delete 1 document with id ${id}, finally deleted ${res.deletedCount}`,
        });
      }
    });
  }
}
