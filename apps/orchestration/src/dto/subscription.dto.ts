import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  firstName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  gender: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsBoolean()
  @IsNotEmpty()
  consent: boolean;

  @IsNumber()
  @IsNotEmpty()
  newsletterId: number;
}
