import { Test, TestingModule } from '@nestjs/testing';
import { Subscription } from '../entities/subscription.entity';
import { SubscriptionDto } from '../dto/subscription.dto';
import { SubscriptionService } from './subscription.service';
import { SubscriptionRepository } from './subscription.repository';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let subscriptionRepository: SubscriptionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: SubscriptionRepository,
          useValue: {
            save: jest.fn(),
            cancel: jest.fn(),
            findOne: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
    subscriptionRepository = module.get<SubscriptionRepository>(SubscriptionRepository);
  });

  describe('createSubscription', () => {
    it('should create a subscription', () => {
      const subscriptionDto: SubscriptionDto = {
        firstName: 'John',
        email: 'john@example.com',
        gender: 'female',
        dateOfBirth: '1995-01-01',
        consent: false,
        newsletterId: 2,
      };
      const expectedSubscription = new Subscription();
      expectedSubscription.email = subscriptionDto.email;
      expectedSubscription.firstName = subscriptionDto.firstName;
      expectedSubscription.gender = subscriptionDto.gender;
      expectedSubscription.dateOfBirth = subscriptionDto.dateOfBirth;
      expectedSubscription.consent = subscriptionDto.consent;
      expectedSubscription.newsletterId = subscriptionDto.newsletterId;

      service.createSubscription(subscriptionDto);

      expect(subscriptionRepository.save).toHaveBeenCalledWith(expectedSubscription);
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel a subscription', () => {
      const email = 'test@example.com';

      service.cancelSubscription(email);

      expect(subscriptionRepository.cancel).toHaveBeenCalledWith(email);
    });
  });

  describe('getSubscription', () => {
    it('should return a subscription by id', async () => {
      const id = 1;
      const expectedSubscription = new Subscription();
      jest.spyOn(subscriptionRepository, 'findOne').mockResolvedValue(expectedSubscription);

      const result = await service.getSubscription(id);

      expect(subscriptionRepository.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(JSON.stringify(expectedSubscription));
    });
  });

  describe('getAllSubscription', () => {
    it('should return all subscriptions', async () => {
      const expectedSubscriptions = [new Subscription(), new Subscription()];
      jest.spyOn(subscriptionRepository, 'getAll').mockResolvedValue(expectedSubscriptions);

      const result = await service.getAllSubscription();

      expect(subscriptionRepository.getAll).toHaveBeenCalled();
      expect(result).toEqual(JSON.stringify(expectedSubscriptions));
    });
  });
});
