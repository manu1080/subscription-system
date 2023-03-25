import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const timeoutMs = 30000;

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const timeoutId = setTimeout(() => {
      res.statusCode = HttpStatus.GATEWAY_TIMEOUT;
      res.end();
    }, timeoutMs);

    res.on('finish', () => {
      clearTimeout(timeoutId);
    });

    next();
  }
}
