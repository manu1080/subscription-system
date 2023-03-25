import { Injectable } from '@nestjs/common';
import { SubscriptionDto } from '../dto/subscription.dto';
import { Subscription } from '../entities';
import { NotificationService } from './notification.service';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository,
    private readonly notificationService: NotificationService) { }

  async createSubscription(data: SubscriptionDto): Promise<void> {
    const subscriptionEntity = data as Subscription
    if (await this.validateSubscription(data.email)) return;

    const createdSubscription = await this.subscriptionRepository.save(subscriptionEntity);
    if (createdSubscription) this.notificationService.createdSubscription(createdSubscription.email);
  }

  async cancelSubscription(email: string): Promise<void> {
    const cancelledSubscription = await this.subscriptionRepository.cancel(email);
    if (cancelledSubscription) this.notificationService.cancelledSubscription(email);
  }

  async getSubscription(id: number): Promise<string> {
    const result = await this.subscriptionRepository.findOne(id);
    return JSON.stringify(result)
  }

  async getAllSubscription(): Promise<string> {
    const result = await this.subscriptionRepository.getAll();
    return JSON.stringify(result);
  }

  private async validateSubscription(email: string): Promise<boolean> {
    return await this.subscriptionRepository.findByEmail(email) ? true : false;
  }
}
