import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SubscriptionDto } from '../dto/subscription.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_MICROSERVICE') private readonly notificationClient: ClientKafka) { }

  createdSubscription(email: string): void {
    this.notificationClient.emit('created_subscription', JSON.stringify({ email }));
  }

  cancelledSubscription(email: string): void {
    this.notificationClient.emit('cancelled_subscription', JSON.stringify({ email }));
  }

}
