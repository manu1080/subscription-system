import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  firstName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dateOfBirth: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  consent: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  newsletterId: number;
}
