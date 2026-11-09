import type { Task } from '../../types';
import type { StatusFilter } from '../utils/guards';

export interface Filters {
  status: StatusFilter;
  projectId: string; 
  search: string;
}

export interface State {
  tasks: Task[];
  filters: Filters;
}

export const defaultFilters: Filters = { status: 'all', projectId: 'all', search: '' };

export type TaskChanges = Partial<Pick<Task, 'assigneeId' | 'priority'>>;

export type TaskAction =
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'TOGGLE_TASK'; id: string }
  | { type: 'UPDATE_TASK'; id: string; changes: TaskChanges }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'SET_FILTER'; filter: Partial<Filters> };

function assertNever(action: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
}

export function tasksReducer(state: State, action: TaskAction): State {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t)),
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, ...action.changes } : t)),
      };

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };

    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.filter } };

    default:
      return assertNever(action);
  }
}
