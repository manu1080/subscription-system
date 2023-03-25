import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) { }

  async save(subscription: Subscription): Promise<Subscription> {
    return this.subscriptionRepository.save(subscription);
  }

  async findOne(id: number) {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    return subscription || {};
  }

  async findByEmail(email: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        email: email,
        isDeleted: false,
      },
    });
    return subscription || null;
  }

  async cancel(email: string): Promise<Subscription> {
    const subscription = await this.findByEmail(email);
    if (subscription) {
      subscription.isDeleted = true;
      return await this.subscriptionRepository.save(subscription);
    }
  }

  async getAll() {
    return this.subscriptionRepository.find({
      where: {
        isDeleted: false
      }
    });
  }
}
