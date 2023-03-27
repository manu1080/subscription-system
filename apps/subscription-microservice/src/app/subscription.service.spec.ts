import { Test, TestingModule } from '@nestjs/testing';
import { Subscription } from '../entities/subscription.entity';
import { SubscriptionDto } from '../dto/subscription.dto';
import { SubscriptionService } from './subscription.service';
import { SubscriptionRepository } from './subscription.repository';
import { NotificationService } from './notification.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let subscriptionRepository: SubscriptionRepository;
  let notificationService: NotificationService;

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
            findByEmail: jest.fn(),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            createdSubscription: jest.fn(),
            cancelledSubscription: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
    subscriptionRepository = module.get<SubscriptionRepository>(SubscriptionRepository);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  describe('createSubscription', () => {
    it('should create a subscription', async () => {
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
      jest.spyOn(subscriptionRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(subscriptionRepository, 'save').mockResolvedValueOnce(expectedSubscription);

      const result = await service.createSubscription(subscriptionDto);

      expect(subscriptionRepository.findByEmail).toHaveBeenCalledWith(subscriptionDto.email);
      expect(subscriptionRepository.save).toHaveBeenCalledWith(expectedSubscription);
      expect(result).toStrictEqual(JSON.stringify(expectedSubscription));
      expect(notificationService.createdSubscription).toHaveBeenCalledWith(subscriptionDto.email);
    });

    it('should not create a subscription or send notification when email already exists', async () => {
      const subscriptionDto: SubscriptionDto = {
        firstName: 'John',
        email: 'john@example.com',
        gender: 'female',
        dateOfBirth: '1995-01-01',
        consent: false,
        newsletterId: 2,
      };
      jest.spyOn(subscriptionRepository, 'findByEmail').mockResolvedValue(subscriptionDto as Subscription);

      await service.createSubscription(subscriptionDto);

      expect(subscriptionRepository.findByEmail).toHaveBeenCalledWith(subscriptionDto.email);
      expect(subscriptionRepository.save).not.toHaveBeenCalled();
      expect(notificationService.createdSubscription).not.toHaveBeenCalled();
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel a subscription', async () => {
      const email = 'test@example.com';
      jest.spyOn(subscriptionRepository, 'cancel').mockResolvedValue(new Subscription());

      await service.cancelSubscription(email);

      expect(subscriptionRepository.cancel).toHaveBeenCalledWith(email);
      expect(notificationService.cancelledSubscription).toHaveBeenCalledWith(email);
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
