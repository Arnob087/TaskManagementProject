import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  deadline: Date;

  @IsOptional()
  completed?: boolean;

  @IsNumber()
  userId: number;
}
