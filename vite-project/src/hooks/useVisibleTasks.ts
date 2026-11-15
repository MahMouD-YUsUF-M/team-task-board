import { useMemo } from 'react';
import { useTaskState } from '../state/hooks';
import type { Task } from '../../types';
import { useDebouncedValue } from './useDebouncedValue';

export function useVisibleTasks(): Task[] {
  const { tasks, filters } = useTaskState();
  const search = useDebouncedValue(filters.search, 300);

  return useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks
      .filter((t) => {
        if (filters.status === 'active' && t.completed) return false;
        if (filters.status === 'completed' && !t.completed) return false;
        if (filters.projectId !== 'all' && t.projectId !== filters.projectId) return false;
        return query === '' || t.title.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
        return a.dueDate.localeCompare(b.dueDate);
      });
  }, [tasks, filters.status, filters.projectId, search]);
}
