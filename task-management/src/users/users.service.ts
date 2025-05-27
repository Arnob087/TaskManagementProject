import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Users.entity';
import { CreateUserDto } from './DTO/Users.dto';
import * as crypto from 'bcryptjs'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
  const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }

  dto.password = await crypto.hash(dto.password, 10);
  const user = this.userRepo.create(dto);
  return this.userRepo.save(user);
}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: {  email: email }});
  }


}
