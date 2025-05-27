import { Controller, Get, Post, Request, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './DTO/Tasks.dto';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { Role } from 'src/users/Users.entity';
import { Roles, RolesGuard } from 'src/auth/roles.gaurd';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() update: CreateTaskDto) {
    return this.taskService.update(+id, update);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
   return this.taskService.findByUserId(+userId);
  }

  @Get('task/:month')
  findByMonth(@Param('month') month: string,  @Request() req) {
    return this.taskService.findByMonth(month, req.user.userId);
  }

}
