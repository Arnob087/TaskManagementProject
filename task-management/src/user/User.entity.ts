import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//import { Task } from '../task/Task.entity';
export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.EMPLOYEE,
  })
  role: Role;

  @Column()
  token: string;

 // @OneToMany(() => Task, (task) => task.user)
//  tasks: Task[];
}
