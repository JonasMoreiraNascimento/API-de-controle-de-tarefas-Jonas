import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ValidateId {
   static task = async (request: Request, response: Response, next: NextFunction) => {
      try {
         const taskId = Number(request.params.id);

         const task = await prisma.task.findUnique({ where: { id: taskId } });

         if (!task) {
            return response.status(404).json({ errorMessage: 'Task not found' });
         }

         next();
      } catch (error) {
         console.error(error); 
         return response.status(500).json({ errorMessage: 'Internal server error' });
      } finally {
         await prisma.$disconnect(); 
      }
   };

   static category = async (request: Request, response: Response, next: NextFunction) => {
      try {
         const categoryId = Number(request.params.id);
         const category = await prisma.category.findUnique({ where: { id: categoryId } });

         if (!category) {
            return response.status(404).json({ errorMessage: 'Category not found' });
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
