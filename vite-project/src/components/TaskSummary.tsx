import { useTaskSummary } from '../hooks/useTaskSummary';

export function TaskSummary() {
  const { total, completed, overdue } = useTaskSummary();

  return (
    <section className="summary" aria-label="Task summary">
      <span>Total: <strong>{total}</strong></span>
      <span>Completed: <strong>{completed}</strong></span>
      <span>Overdue: <strong>{overdue}</strong></span>
    </section>
  );
}
