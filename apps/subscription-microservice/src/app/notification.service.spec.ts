import { Test, TestingModule } from '@nestjs/testing';
import { ClientKafka } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let client: ClientKafka;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: 'NOTIFICATION_MICROSERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    client = module.get<ClientKafka>('NOTIFICATION_MICROSERVICE');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createdSubscription', () => {
    it('should call emit method of notificationClient with created_subscription event and email parameter', () => {
      const email = 'test@example.com';

      service.createdSubscription(email);

      expect(client.emit).toHaveBeenCalledWith('created_subscription', JSON.stringify({ email }));
    });
  });

  describe('cancelledSubscription', () => {
    it('should call emit method of notificationClient with cancelled_subscription event and email parameter', () => {
      const email = 'test@example.com';

      service.cancelledSubscription(email);

      expect(client.emit).toHaveBeenCalledWith('cancelled_subscription', JSON.stringify({ email }));
    });
  });
});
