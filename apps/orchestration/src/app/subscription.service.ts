import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { from } from 'rxjs';
import { EmailDto } from '../dto/email.dto';
import { SubscriptionDto } from '../dto/subscription.dto';

@Injectable()
export class SubscriptionService implements OnModuleInit {
  constructor(
    @Inject('SUBSCRIPTION_MICROSERVICE') private readonly subscriptionClient: ClientKafka,
    private readonly emailService: EmailService
  ) { }

  createSubscription(subscriptionDto: SubscriptionDto) {
    this.subscriptionClient.emit('create_subscription', JSON.stringify(subscriptionDto));
    this.emailService.sendSubscriptionEmail(subscriptionDto.email);
  }

  cancelSubscription(emailDto: EmailDto) {
    const email = emailDto.email;
    this.subscriptionClient.emit('cancel_subscription', JSON.stringify({ email }));
    this.emailService.sendCancelSubscriptionEmail(email);
  }

  async getAll() {
    const result = await from(this.subscriptionClient.send('get_subscriptions', JSON.stringify({})))
      .toPromise();
    return result;
  }

  async getSubscriptionById(id: number) {
    const result = await from(this.subscriptionClient.send('get_subscription_by_id', JSON.stringify({ id })))
      .toPromise();
    return result;
  }
  onModuleInit() {
    this.subscriptionClient.subscribeToResponseOf('get_subscription_by_id');
    this.subscriptionClient.subscribeToResponseOf('get_subscriptions');
  }
}
