import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';
import { TTask, TTaskSchema, TTaskUpdate, TaskWithCategoryType } from '../interfaces/task.interface';

@injectable()
export class TaskService {
   private prisma: PrismaClient;

   constructor() {
      this.prisma = new PrismaClient();
   }

   create = async (data: TTask): Promise<TTaskSchema> => {
      const task = await this.prisma.task.create({
         data
      });
      return task;
   };

   findOne = async (id: number): Promise<TaskWithCategoryType | null> => {
      const task = await this.prisma.task.findFirst({
         where: {
            id
         },
         include: {
            category: true
         }
      });

      return task;
   };

   findMany = async (categoryName?: string): Promise<TaskWithCategoryType[] | null> => {
      const tasks = await this.prisma.task.findMany({
         where: {
            ...(categoryName && {
               category: { name: categoryName }
            })
         },
         include: {
            category: true
         }
      });
      return tasks;
   };

   update = async (id: number, data: TTaskUpdate): Promise<TTaskSchema> => {
      const task = await this.prisma.task.update({
         where: { id },
         data
      });

      return task;
   };

   delete = async (id: number) => {
      const task = await this.prisma.task.delete({ where: { id } });
      return task;
   };

   async disconnect() {
      await this.prisma.$disconnect();
   }
}
