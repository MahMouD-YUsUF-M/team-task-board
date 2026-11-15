import { useMemo } from 'react';
import { useTaskState } from '../state/hooks';
import { isOverdue, todayISO } from '../utils/dates';

export interface TaskSummaryData {
  total: number;
  completed: number;
  overdue: number;
}

export function useTaskSummary(): TaskSummaryData {
  const { tasks } = useTaskState();

  return useMemo(() => {
    const today = todayISO();
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      overdue: tasks.filter((t) => isOverdue(t, today)).length,
    };
  }, [tasks]);
}
