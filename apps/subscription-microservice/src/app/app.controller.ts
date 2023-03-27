import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriptionDto } from '../dto/subscription.dto';

import { SubscriptionService } from './subscription.service';

@Controller()
export class AppController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @EventPattern('create_subscription')
  handleSubscriptionCreate(@Payload(ValidationPipe) data: SubscriptionDto) {
    this.subscriptionService.createSubscription(data);
  }

  @EventPattern('cancel_subscription')
  handleSubscriptionCancel(@Payload('email') email: string) {
    this.subscriptionService.cancelSubscription(email);
  }

  @MessagePattern('create_subscription_return_id')
  async handleCreateSubscriptionAndReturnId(@Payload(ValidationPipe) data: SubscriptionDto) {
    return await this.subscriptionService.createSubscription(data);
  }

  @MessagePattern('get_subscriptions')
  async handleGetSubscriptions() {
    return await this.subscriptionService.getAllSubscription();
  }

  @MessagePattern('get_subscription_by_id')
  async handleGetSubscription(@Payload('id', ParseIntPipe) id: number) {
    return await this.subscriptionService.getSubscription(id);
  }

}
