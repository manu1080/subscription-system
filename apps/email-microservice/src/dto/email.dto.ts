import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  body: string;

  constructor(subject: string, email: string, body: string) {
    this.subject = subject
    this.email = email
    this.body = body
  }
}
