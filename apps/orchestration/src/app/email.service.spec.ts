import { Test } from "@nestjs/testing";
import { ClientKafka } from "@nestjs/microservices";
import { EmailService } from "./email.service";
import { EmailSenderDto } from "../dto/emailSender.dto";

describe('EmailService', () => {
  let emailService: EmailService;
  let clientKafkaMock: jest.Mocked<ClientKafka>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: 'EMAIL_MICROSERVICE',
          useValue: {
            emit: jest.fn()
          }
        }
      ]
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    clientKafkaMock = module.get('EMAIL_MICROSERVICE');
  });

  describe('sendSubscriptionEmail', () => {
    it('should send subscription email', () => {
      const email = 'test@example.com';
      const expectedData = new EmailSenderDto('Create Subscription', email, '');

      emailService.sendSubscriptionEmail(email);

      expect(clientKafkaMock.emit).toHaveBeenCalledWith('send_email', JSON.stringify(expectedData));
    });
  });

  describe('sendCancelSubscriptionEmail', () => {
    it('should send cancel subscription email', () => {
      const email = 'test@example.com';
      const expectedData = new EmailSenderDto('Cancel Subscription', email, '');

      emailService.sendCancelSubscriptionEmail(email);

      expect(clientKafkaMock.emit).toHaveBeenCalledWith('send_email', JSON.stringify(expectedData));
    });
  });
});
