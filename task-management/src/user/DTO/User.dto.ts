import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  @IsString()
  @IsOptional()
  role?: string;
}
