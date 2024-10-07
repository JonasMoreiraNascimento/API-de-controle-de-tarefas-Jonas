import { Router } from 'express';
import { ValidateId } from '../middlewares/validateId.middleware'; 
import { TaskController } from '../controllers/task.controller';
import { ValidateBody } from '../middlewares/validateBody.middleware';
import { taskSchemaCreate, taskSchemaUpdate } from '../schemas/task.schema';
import { ValidateCategory } from '../middlewares/validateCategory.middleware';

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post('/', ValidateBody.execute(taskSchemaCreate), ValidateCategory.execute, taskController.create);
taskRouter.get('/', taskController.findMany);
taskRouter.get('/:id', ValidateId.task, taskController.findOne); 
taskRouter.patch('/:id', ValidateId.task, ValidateBody.execute(taskSchemaUpdate), taskController.update); 