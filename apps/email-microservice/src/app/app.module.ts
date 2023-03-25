import { EmailProvider } from './emailProvider';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmailService } from './email.service';
import { MockEmailProviderService } from './mockEmailProviderService.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: EmailProvider,
      useClass: MockEmailProviderService,
    },
    EmailService
  ],
  exports: [],
})
export class AppModule { }
