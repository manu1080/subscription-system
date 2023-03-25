import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionDto } from '../dto/subscription.dto';
import { EmailDto } from '../dto/email.dto';

import { SubscriptionService } from './subscription.service';

@ApiTags('Subscriptions')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create subscriptions' })
  @ApiResponse({ status: 200 })
  createSubscription(@Body(ValidationPipe) subscriptionDto: SubscriptionDto) {
    this.subscriptionService.createSubscription(subscriptionDto);
  }

  @Post('cancel/:email')
  @ApiOperation({ summary: 'Cancel subscription' })
  @ApiParam({ name: 'email' })
  @ApiResponse({ status: 200 })
  cancelSubscription(@Param(ValidationPipe) email: EmailDto) {
    this.subscriptionService.cancelSubscription(email);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiResponse({ status: 200, description: 'Return all subscriptions.' })
  async getAllSubscriptions() {
    return await this.subscriptionService.getAll();
  }

  @Get('subscription/:id')
  @ApiOperation({ summary: 'Get subscription' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Return subscription.' })
  async getSubscriptionById(@Param('id') id) {
    return await this.subscriptionService.getSubscriptionById(id);
  }
}
