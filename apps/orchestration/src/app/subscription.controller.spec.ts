import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { EmailDto } from '../dto/email.dto';
import { SubscriptionDto } from '../dto/subscription.dto';

describe('SubscriptionController', () => {
  let controller: SubscriptionController;
  let subscriptionService: SubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [
        {
          provide: SubscriptionService,
          useValue: {
            createSubscription: jest.fn(),
            cancelSubscription: jest.fn(),
            getAll: jest.fn(),
            getSubscriptionById: jest.fn(),
            createdSubscriptionAndReturnId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SubscriptionController>(SubscriptionController);
    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createSubscription', () => {
    it('should call createSubscription in service with correct input', async () => {
      const subscriptionDto: SubscriptionDto = {
        firstName: 'John',
        email: 'john@example.com',
        gender: 'male',
        dateOfBirth: '1990-01-01',
        consent: true,
        newsletterId: 1,
      };

      const createSubscriptionSpy = jest.spyOn(subscriptionService, 'createSubscription');

      await controller.createSubscription(subscriptionDto);

      expect(createSubscriptionSpy).toHaveBeenCalledWith(subscriptionDto);
    });
  });

  describe('createSubscriptionAndReturnId', () => {
    it('should call createdSubscriptionAndReturnId in service with correct input', async () => {
      const subscriptionDto: SubscriptionDto = {
        firstName: 'John',
        email: 'john@example.com',
        gender: 'male',
        dateOfBirth: '1990-01-01',
        consent: true,
        newsletterId: 1,
      };

      const createdSubscriptionAndReturnIdSpy = jest.spyOn(subscriptionService, 'createdSubscriptionAndReturnId').mockResolvedValueOnce({id:1});

      const response = await controller.createSubscriptionAndReturnId(subscriptionDto);

      expect(createdSubscriptionAndReturnIdSpy).toHaveBeenCalledWith(subscriptionDto);
      expect(response).toEqual({id:1});
    });

    it('should throw an error if createdSubscriptionAndReturnId in service fails', async () => {
      const subscriptionDto: SubscriptionDto = {
        firstName: 'John',
        email: 'john@example.com',
        gender: 'male',
        dateOfBirth: '1990-01-01',
        consent: true,
        newsletterId: 1,
      };

      jest.spyOn(subscriptionService, 'createdSubscriptionAndReturnId').mockRejectedValueOnce(new Error());

      await expect(controller.createSubscriptionAndReturnId(subscriptionDto)).rejects.toThrowError();
    });
  });

  describe('cancelSubscription', () => {
    it('should call cancelSubscription in service with correct email', async () => {
      const email = { email: 'test@example.com' } as EmailDto;
      const cancelSubscriptionSpy = jest.spyOn(subscriptionService, 'cancelSubscription');

      await controller.cancelSubscription(email);

      expect(cancelSubscriptionSpy).toHaveBeenCalledWith(email);
    });

  });

  describe('getAllSubscriptions', () => {
    it('should return all subscriptions', async () => {
      const subscriptions = [{ id: 1, email: 'test@example.com' }];
      jest.spyOn(subscriptionService, 'getAll').mockImplementation(() => Promise.resolve(subscriptions));

      expect(await controller.getAllSubscriptions()).toEqual(subscriptions);
      expect(subscriptionService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSubscriptionById', () => {
    it('should return a subscription by id', async () => {
      const subscriptionId = 1;
      const subscription = { id: subscriptionId, email: 'test@example.com' };
      jest.spyOn(subscriptionService, 'getSubscriptionById').mockImplementation(() => Promise.resolve(subscription));

      expect(await controller.getSubscriptionById(subscriptionId)).toEqual(subscription);
      expect(subscriptionService.getSubscriptionById).toHaveBeenCalledTimes(1);
      expect(subscriptionService.getSubscriptionById).toHaveBeenCalledWith(subscriptionId);
    });
  });
});
