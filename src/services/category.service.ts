import { injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { TCategory, TCategoryData } from '../interfaces/category.interface';

@injectable()
export class CategoryService {
   private prisma: PrismaClient;

   constructor() {
      this.prisma = new PrismaClient();
   }

   create = async (data: TCategoryData): Promise<TCategory> => {
      const category = await this.prisma.category.create({
         data
      });
      return category;
   };

   delete = async (id: number) => {
      const category = await this.prisma.category.delete({ where: { id } });
      return category;
   };

   async disconnect() {
      await this.prisma.$disconnect();
   }
}
