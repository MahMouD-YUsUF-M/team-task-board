export interface TaskFormValues {
  title: string;
  projectId: string;
  assigneeId: string; 
  priority: string; 
  dueDate: string;
}

export type TaskFormErrors = Partial<Record<'title' | 'projectId' | 'priority' | 'dueDate', string>>;

export function validateTaskForm(values: TaskFormValues, today: string): TaskFormErrors {
  const errors: TaskFormErrors = {};
  const titleLength = values.title.trim().length;

  if (titleLength < 3 || titleLength > 80) {
    errors.title = 'Title must be between 3 and 80 characters.';
  }
  if (values.projectId === '') {
    errors.projectId = 'Please choose a project.';
  }
  if (values.priority === '') {
    errors.priority = 'Please choose a priority.';
  }
  if (values.dueDate === '') {
    errors.dueDate = 'Please choose a due date.';
  } else if (values.dueDate < today) {
    errors.dueDate = 'Due date cannot be in the past.';
  }
  return errors;
}
