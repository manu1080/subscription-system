import { Injectable } from '@nestjs/common';
import { EmailDto } from '../dto/email.dto';
import { EmailProvider } from './emailProvider';

@Injectable()
export class EmailService {
  constructor(private readonly emailProvider: EmailProvider) { }

  async sendEmail(data: EmailDto): Promise<void> {
    await this.emailProvider.sendEmail(data.email, data.subject, data.body);
  }
}
