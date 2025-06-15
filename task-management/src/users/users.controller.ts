import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/Users.dto';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { Role } from './Users.entity';
import { Roles, RolesGuard } from 'src/auth/roles.gaurd';

//@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string , @Request() req) {
    if(req.user.userId === +id) {
      throw new ForbiddenException('You cannot delete your own account');
    }
    else{
    return this.usersService.remove(+id);
    }
  }
}
