import { sampleTasks } from '../data/sampleTasks';
import type { Task } from '../../types';
import { isPriority, isRecord, isStatusFilter } from '../utils/guards';
import { defaultFilters, type Filters, type State } from './tasksReducer';

export const STORAGE_KEY = 'team-task-board:v1';


function isTask(value: unknown): value is Task {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.projectId === 'string' &&
    (value.assigneeId === null || typeof value.assigneeId === 'string') &&
    isPriority(value.priority) &&
    typeof value.dueDate === 'string' &&
    typeof value.completed === 'boolean'
  );
}

export function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}

function isFilters(value: unknown): value is Filters {
  return (
    isRecord(value) &&
    isStatusFilter(value.status) &&
    typeof value.projectId === 'string' &&
    typeof value.search === 'string'
  );
}

function fallbackState(): State {
  return { tasks: sampleTasks, filters: defaultFilters };
}


export function parseStoredState(raw: string | null): State {
  if (raw === null) return fallbackState();
  try {
    const data: unknown = JSON.parse(raw);
    if (isRecord(data) && isTaskArray(data.tasks) && isFilters(data.filters)) {
      return { tasks: data.tasks, filters: data.filters };
    }
  } catch {
  }
  return fallbackState();
}

export function loadInitialState(): State {
  try {
    return parseStoredState(localStorage.getItem(STORAGE_KEY));
  } catch {
    return fallbackState();
  }
}

export function saveState(state: State): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
