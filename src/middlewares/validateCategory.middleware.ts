import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ValidateCategory {
   static execute = async (request: Request, response: Response, next: NextFunction) => {
      try {
         if (request.body.categoryId) {
            const categoryId = parseInt(request.body.categoryId); 
            const category = await prisma.category.findUnique({ where: { id: categoryId } });

            if (!category) {
               return response.status(404).json({ errorMessage: 'Category not found' });
            }
         }

         next();
      } catch (error) {
         console.error(error); 
         return response.status(500).json({ errorMessage: 'Internal server error' });
      } finally {
         await prisma.$disconnect();
      }
   };
}
