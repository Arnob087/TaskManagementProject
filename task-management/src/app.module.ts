import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/Users.entity';
import { Task } from './tasks/Tasks.entity';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UsersModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'TaskManagement',
    entities: [
       User,Task
    ],
    synchronize: true,
  }), TasksModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}