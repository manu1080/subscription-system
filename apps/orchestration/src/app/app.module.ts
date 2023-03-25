import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailService } from './email.service';

import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SUBSCRIPTION_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'subscription',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'subscription-consumer',
          },
        },
      }, {
        name: 'EMAIL_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'email',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'email-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, EmailService],
})
export class AppModule { }
