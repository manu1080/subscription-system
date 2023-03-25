import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class NotificationController {
  constructor(private readonly emailService: EmailService) { }

  @EventPattern('created_subscription')
  handleSubscriptionCreate(@Payload('email') email: string) {
    this.emailService.sendSubscriptionEmail(email);
  }

  @EventPattern('cancelled_subscription')
  handleSubscriptionCancel(@Payload('email') email: string) {
    this.emailService.sendCancelSubscriptionEmail(email);
  }

}
