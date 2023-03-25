import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailSenderDto } from '../dto/email.dto';
import { EmailService } from './email.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: EmailService) { }

  @EventPattern('send_email')
  handleSendEmail(@Payload(ValidationPipe) data: EmailSenderDto) {
    this.emailService.sendEmail(data);
  }

}
