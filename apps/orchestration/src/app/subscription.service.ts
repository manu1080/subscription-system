import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { from, throwError } from 'rxjs';
import { EmailDto } from '../dto/email.dto';
import { SubscriptionDto } from '../dto/subscription.dto';

@Injectable()
export class SubscriptionService implements OnModuleInit {
  constructor(
    @Inject('SUBSCRIPTION_MICROSERVICE') private readonly subscriptionClient: ClientKafka
  ) { }

  createSubscription(subscriptionDto: SubscriptionDto) {
    this.subscriptionClient.emit('create_subscription', JSON.stringify(subscriptionDto));
  }

  async createdSubscriptionAndReturnId(subscriptionDto: SubscriptionDto) {
    const result = await from(this.subscriptionClient.send('create_subscription_return_id', JSON.stringify(subscriptionDto)))
      .toPromise();
    if (!result) throw new Error();;
    return {id :result.id};
  }

  cancelSubscription(emailDto: EmailDto) {
    const email = emailDto.email;
    this.subscriptionClient.emit('cancel_subscription', JSON.stringify({ email }));
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
    this.subscriptionClient.subscribeToResponseOf('create_subscription_return_id');
  }
}
