import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { EmailSenderDto } from "../dto/emailSender.dto";

const createSubscriptionSubject = 'Create Subscription';
const cancelSubscriptionSubject = 'Cancel Subscription';
@Injectable()
export class EmailService {
  constructor(
    @Inject('EMAIL_MICROSERVICE') private readonly emailClient: ClientKafka
  ) { }

  sendSubscriptionEmail(email: string): void {
    const data = new EmailSenderDto(createSubscriptionSubject, email, '')
    this.emailClient.emit('send_email', JSON.stringify(data));
  }

  sendCancelSubscriptionEmail(email: string): void {
    const data = new EmailSenderDto(cancelSubscriptionSubject, email, '')
    this.emailClient.emit('send_email', JSON.stringify(data));
  }
}
