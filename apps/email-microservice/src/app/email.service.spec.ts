import { Test } from '@nestjs/testing';
import { EmailProvider } from './emailProvider';
import { EmailSenderDto } from '../dto/email.dto';
import { EmailService } from './email.service';

const mockEmailProvider = () => ({
  sendEmail: jest.fn(),
});

describe('EmailService', () => {
  let emailService: EmailService;
  let emailProvider: EmailProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: EmailProvider, useFactory: mockEmailProvider },
      ],
    }).compile();

    emailService = moduleRef.get<EmailService>(EmailService);
    emailProvider = moduleRef.get<EmailProvider>(EmailProvider);
  });

  describe('sendEmail', () => {
    const emailSenderDto: EmailSenderDto = {
      email: 'test@test.com',
      subject: 'Test email',
      body: 'This is a test email',
    };

    it('should call emailProvider.sendEmail method with correct arguments', async () => {
      await emailService.sendEmail(emailSenderDto);

      expect(emailProvider.sendEmail).toHaveBeenCalledWith(
        emailSenderDto.email,
        emailSenderDto.subject,
        emailSenderDto.body,
      );
    });

    it('should throw an error if emailProvider.sendEmail method throws an error', async () => {
      const error = new Error('Failed to send email');
      (emailProvider.sendEmail as jest.Mock).mockRejectedValueOnce(error);

      await expect(emailService.sendEmail(emailSenderDto)).rejects.toThrow(error);
    });
  });
});
