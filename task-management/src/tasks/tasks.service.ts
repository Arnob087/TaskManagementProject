import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Not, Repository } from 'typeorm';
import { Task } from './Tasks.entity';
import { CreateTaskDto } from './DTO/Tasks.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateTaskDto) {
    const {userId, ...taskData} = dto;
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const task = {...taskData, user: { id: userId } };
    return this.taskRepo.save(task);
  }

  findAll() {
    return this.taskRepo.find();
  }

  findOne(id: number) {
    return this.taskRepo.findOne({ where: { id } });
  }

  async update(id: number, update: CreateTaskDto) {
    const {userId, ...taskData} = update;
    const user = await this.usersService.findOne(+userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const task = {...taskData, user: { id: userId } };
    return this.taskRepo.update(id, task);
  }

  remove(id: number) {
    return this.taskRepo.delete(id);
  }

  async findByUserId(userId: number) {
    return  await this.taskRepo.find({ where: { user: {id: userId} } }) || [];
  }

  async findByMonth(month: string, userId: number) {
  const startDate = new Date(new Date().getFullYear(), parseInt(month) - 1, 1);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

  return this.taskRepo.find({
    where: {
      day: Between(startDate, endDate),
      user: { id: userId },
    },
    relations: ['user'],
  });
}
}
