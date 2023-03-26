# Welcome to Subscription System

This repository contains a subscription system consisting of three microservices built with Node.js, Nest, Nx, and MySQL, using Kafka for message processing and TypeScript for development.

## Stack

- Node.js v19.8.1
- Nest v9.0.0
- Docker v2
- Nx v15.8.7
- MySQL
- Kafka
- TypeScript
## Tools

- Swagger
- Jest
- TypeORM
- Prettier
## Microservices

### Orchestration Microservice

This microservice uses The Orchestrator pattern and can be run in development mode using the command `npm run start-orchestration`. After starting the microservice, you can access the API documentation by visiting `http://localhost:3000/api`.

### Email Microservice

This microservice is responsible for sending notifications and emails and can be run in development mode using the command `npm run start-email`.

### Subscription Microservice

This microservice contains the subscription database and manages all subscription-related tasks. It can be run in development mode using the command `npm run start-subscription`.

## Getting Started

1. Clone this repository to your local machine.

2. Create a MySQL database and update the credentials in the `.env` file.

3. Install the required dependencies by running `npm install`.

4. Run Kafka with Docker on `localhost:29092` using the command `npm run start-kafka`.

5. Run MySQL with Docker on `localhost:3306` using the command `npm run start-db`.

6. Run the Orchestration Microservice with the command `npm run start-orchestration`.

7. Run the Email Microservice with the command `npm run start-email`.

8. Run the Subscription Microservice with the command `npm run start-subscription`.

9. Access the Swagger documentation at `http://localhost:3000/api`.

10. To run unit tests with Jest, use the command `npm run start-test`.

## Author

- Manuel Irazabal
