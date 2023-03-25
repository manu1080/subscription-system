import { Injectable } from '@nestjs/common';
import { SubscriptionDto } from '../dto/subscription.dto';
import { Subscription } from '../entities';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) { }

  createSubscription(data: SubscriptionDto): void {
    const subscriptionEntity = data as Subscription
    this.subscriptionRepository.save(subscriptionEntity);
  }

  cancelSubscription(email: string): void {
    this.subscriptionRepository.cancel(email);
  }

  async getSubscription(id: number): Promise<string> {
    const result = await this.subscriptionRepository.findOne(id);
    return JSON.stringify(result)
  }

  async getAllSubscription(): Promise<string> {
    const result = await this.subscriptionRepository.getAll();
    return JSON.stringify(result);
  }
}
