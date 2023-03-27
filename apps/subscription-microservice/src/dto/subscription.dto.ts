import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
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
