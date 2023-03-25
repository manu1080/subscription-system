import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class EmailProvider {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    console.log(to, subject, body)
  }
}