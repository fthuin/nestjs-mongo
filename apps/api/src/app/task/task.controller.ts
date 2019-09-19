import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto, Task } from '@emafeed/api-interfaces';
import * as mongoose from 'mongoose';

function toObjectId(id: string) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return id;
  } else {
    throw new BadRequestException({
      message: `Could not convert ${id} to ObjectId`,
    });
  }
}

class TaskMarshaller {
  static validation(taskDto: TaskDto): void {
    if (!taskDto) {
      throw new BadRequestException({
        message: `Expected a valid TaskDto as body`,
      });
    } else if (taskDto.title === undefined || taskDto.title === null) {
      throw new BadRequestException({
        message: `Expected a title to be set but got ${taskDto.title}`,
      });
    }

  }

  static toJson(task: Task): TaskDto {
    return {
      id: task._id,
      title: task.title,
      description: task.description,
      done: task.done,
    }
  }
}

@Controller('tasks')
export class TaskController {

  constructor(
    private taskService: TaskService
  ) {}

  @Post('')
  async createTask(@Body() taskDto: TaskDto): Promise<TaskDto> {
    TaskMarshaller.validation(taskDto);

    return this.taskService.create(taskDto).then(TaskMarshaller.toJson);
  }

  @Get('')
  getTasks(): Promise<TaskDto[]> {
    return this.taskService.getAll().then((res) => res.map(TaskMarshaller.toJson));
  }

  @Get(':id')
  getTask(@Param('id') id: string): Promise<TaskDto> {
    return this.taskService.get(id).then(TaskMarshaller.toJson);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() taskDto: TaskDto): Promise<TaskDto> {
    taskDto.id = toObjectId(taskDto.id);
    return this.taskService.update(id, taskDto).then(TaskMarshaller.toJson);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }
}
