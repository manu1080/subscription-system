import { Injectable } from '@nestjs/common';
import { EmailSenderDto } from '../dto/email.dto';
import { EmailProvider } from './emailProvider';

@Injectable()
export class EmailService {
  constructor(private readonly emailProvider: EmailProvider) { }

  async sendEmail(data: EmailSenderDto): Promise<void> {
    await this.emailProvider.sendEmail(data.email, data.subject, data.body);
  }
}
