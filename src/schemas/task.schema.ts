import { object, string, boolean, number } from 'zod';
import { categorySchema } from './category.schema';

export const taskSchema = object({
   id: number().positive(),
   title: string().min(1),
   content: string().min(1),
   finished: boolean(),
   categoryId: number().nullable().optional()
});

export const taskWithCategorySchema = taskSchema.extend({
   category: categorySchema.nullable().optional()
});

export const taskSchemaCreate = taskSchema.omit({ id: true, finished: true });
export const taskSchemaUpdate = taskSchema.omit({ id: true }).partial();
