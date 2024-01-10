import { check, param } from 'express-validator';

const taskValidator = {
  getTasksByColocation: [
    param('colocationId').isInt().withMessage('Colocation ID must be an integer'),
  ],
  getTask: [
    param('colocationId').isInt().withMessage('Colocation ID must be an integer'),
    param('taskId').isInt().withMessage('Task ID must be an integer'),
  ],
  addTask: [
    param('colocationId').isInt().withMessage('Colocation ID must be an integer'),
    check('name').notEmpty().withMessage('Name is required'),
    check('description').optional(),
    check('deadline')
  .optional()
  .custom((value) => {
    const isoFormat = /^\d{4}-\d{2}-\d{2}$/; // Format ISO8601
    const slashFormat = /^\d{4}\/\d{2}\/\d{2}$/; // Format avec des slashes

    if (!isoFormat.test(value) && !slashFormat.test(value)) {
      throw new Error('Invalid deadline format');
    }

    return true;
  })
  .toDate()
  .withMessage('Invalid deadline format'),
    check('estimated_duration').isInt({ min: 1 }).withMessage('Estimated duration must be an integer'),
  ],
  deleteTask: [
    param('colocationId').isInt().withMessage('Colocation ID must be an integer'),
    param('taskId').isInt().withMessage('Task ID must be an integer'),
  ],
  updateTask: [
    param('colocationId').isInt().withMessage('Colocation ID must be an integer'),
    param('taskId').isInt().withMessage('Task ID must be an integer'),
    check('estimated_duration').optional().isInt().withMessage('Estimated duration must be an integer'),
    check('name').optional(),
    check('deadline')
      .optional()
      .custom((value) => {
        const isoFormat = /^\d{4}-\d{2}-\d{2}$/; // Format ISO8601
        const slashFormat = /^\d{4}\/\d{2}\/\d{2}$/; // Format avec des slashes
  
        if (!isoFormat.test(value) && !slashFormat.test(value)) {
          throw new Error('Invalid deadline format');
        }
  
        return true;
      })
      .toDate()
      .withMessage('Invalid deadline format'),
    check('is_completed').optional().isBoolean().withMessage('Invalid boolean value for is_completed'),
  ],
  assignUserToTask: [
    param('colocationId').isInt().withMessage('Colocation ID must be an integer'),
    param('taskId').isInt().withMessage('Task ID must be an integer'),
    check('userId').isInt().withMessage('User ID must be an integer'),
  ],
  removeUserFromTask: [
    param('colocationId').isInt().withMessage('Colocation ID must be an integer'),
    param('taskId').isInt().withMessage('Task ID must be an integer'),
    check('userId').isInt().withMessage('User ID must be an integer'),
  ],
};

export default taskValidator;
