import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from './subscription.service';
import { ClientKafka } from '@nestjs/microservices';
import { of } from 'rxjs';
import { EmailDto } from '../dto/email.dto';
import { SubscriptionDto } from '../dto/subscription.dto';

describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService;
  let clientKafkaMock: jest.Mocked<ClientKafka>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: 'SUBSCRIPTION_MICROSERVICE',
          useValue: {
            emit: jest.fn(),
            send: jest.fn(() => of({})),
            subscribeToResponseOf: jest.fn(),
          },
        }
      ],
    }).compile();

    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
    clientKafkaMock = module.get('SUBSCRIPTION_MICROSERVICE');
  });

  describe('createSubscription', () => {
    it('should emit "create_subscription" event and send subscription email', () => {
      const subscriptionDto: SubscriptionDto = {
        firstName: 'John',
        email: 'john@example.com',
        gender: 'male',
        dateOfBirth: '1990-01-01',
        consent: true,
        newsletterId: 1,
      };

      subscriptionService.createSubscription(subscriptionDto);

      expect(clientKafkaMock.emit).toHaveBeenCalledWith(
        'create_subscription',
        JSON.stringify(subscriptionDto),
      );

    });
  });

  describe('cancelSubscription', () => {
    it('should emit "cancel_subscription" event and send cancel subscription email', () => {
      const emailDto: EmailDto = { email: 'johndoe@example.com' };

      subscriptionService.cancelSubscription(emailDto);

      expect(clientKafkaMock.emit).toHaveBeenCalledWith(
        'cancel_subscription',
        JSON.stringify({ email: emailDto.email }),
      );

    });
  });

  describe('getAll', () => {
    it('should call "send" method of kafka client with "get_subscriptions" event and return the result', async () => {
      const result = await subscriptionService.getAll();

      expect(clientKafkaMock.send).toHaveBeenCalledWith(
        'get_subscriptions',
        JSON.stringify({}),
      );

      expect(result).toEqual({});
    });
  });

  describe('getSubscriptionById', () => {
    it('should call "send" method of kafka client with "get_subscription_by_id" event and return the result', async () => {
      const id = 1;
      const result = await subscriptionService.getSubscriptionById(id);

      expect(clientKafkaMock.send).toHaveBeenCalledWith(
        'get_subscription_by_id',
        JSON.stringify({ id }),
      );

      expect(result).toEqual({});
    });
  });
});
