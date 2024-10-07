import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

export class ValidateBody {
   static execute = (schema: ZodTypeAny) => (request: Request, _: Response, next: NextFunction) => {
      try {
         request.body = schema.parse(request.body);
         return next();
      } catch (error) {
         return next(error);
      }
   };
}
