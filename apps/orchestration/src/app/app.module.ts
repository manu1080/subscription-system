import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TimeoutMiddleware } from '../middlewares/timeout-middleware';
import { EmailService } from './email.service';
import { NotificationController } from './notification.controller';

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
  controllers: [SubscriptionController, NotificationController],
  providers: [SubscriptionService, EmailService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeoutMiddleware).forRoutes('*');
  }
}
