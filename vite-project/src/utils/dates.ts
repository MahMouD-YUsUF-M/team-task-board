export function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

const formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' });

export function formatDueDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
 
  return formatter.format(new Date(year, month - 1, day));
}

export function isOverdue(task: { completed: boolean; dueDate: string }, today: string): boolean {
  return !task.completed && task.dueDate < today;
}