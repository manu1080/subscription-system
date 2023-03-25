import { Injectable } from '@nestjs/common';
import { EmailProvider } from './emailProvider';

@Injectable()
export class MockEmailProviderService extends EmailProvider {
  private sentEmails: { to: string, subject: string, body: string }[] = [];

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    this.sentEmails.push({ to, subject, body });
    console.log(`Send Email ${subject} ${to}`);
  }

}
