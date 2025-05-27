import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './Tasks.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User } from 'src/users/Users.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),UsersModule],
  controllers: [TasksController],
  providers: [TasksService,UsersService],
})
export class TasksModule {}
