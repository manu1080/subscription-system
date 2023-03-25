import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  gender: string;

  @Column()
  dateOfBirth: string;

  @Column()
  consent: boolean;

  @Column()
  newsletterId: number;

  @Column({ default: false })
  isDeleted: boolean;
}
