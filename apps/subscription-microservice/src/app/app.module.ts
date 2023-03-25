import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../entities';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'notification-consumer',
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Subscription],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Subscription]),
  ],
  controllers: [AppController],
  providers: [SubscriptionRepository, SubscriptionService, NotificationService],
})
export class AppModule { }
