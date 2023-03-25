import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriptionDto } from '../dto/subscription.dto';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('create_subscription')
  handleSubscriptionCreate(@Payload(ValidationPipe) data: SubscriptionDto) {
    this.appService.createSubscription(data);
  }

  @EventPattern('cancel_subscription')
  handleSubscriptionCancel(@Payload('email') email: string) {
    this.appService.cancelSubscription(email);
  }

  @MessagePattern('get_subscriptions')
  async handleGetSubscriptions() {
    return await this.appService.getAllSubscription();
  }

  @MessagePattern('get_subscription_by_id')
  async handleGetSubscription(@Payload('id', ParseIntPipe) id: number) {
    return await this.appService.getSubscription(id);
  }

}
