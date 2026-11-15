import { useContext, useMemo } from 'react';
import type { NewTask } from '../../types';
import { TaskDispatchContext, TaskStateContext } from './taskContexts';
import type { Filters, State, TaskChanges } from './tasksReducer';

export function useTaskState(): State {
  const state = useContext(TaskStateContext);
  if (state === null) {
    throw new Error('useTaskState must be used inside <TaskProvider>.');
  }
  return state;
}

export interface TaskActions {
  addTask: (newTask: NewTask) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, changes: TaskChanges) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: Partial<Filters>) => void;
}

export function useTaskActions(): TaskActions {
  const dispatch = useContext(TaskDispatchContext);
  if (dispatch === null) {
    throw new Error('useTaskActions must be used inside <TaskProvider>.');
  }


  return useMemo<TaskActions>(
    () => ({
      addTask: (newTask) => {
        dispatch({
          type: 'ADD_TASK',
          task: { ...newTask, id: crypto.randomUUID(), completed: false },
        });
      },
      toggleTask: (id) => dispatch({ type: 'TOGGLE_TASK', id }),
      updateTask: (id, changes) => dispatch({ type: 'UPDATE_TASK', id, changes }),
      deleteTask: (id) => dispatch({ type: 'DELETE_TASK', id }),
      setFilter: (filter) => dispatch({ type: 'SET_FILTER', filter }),
    }),
    [dispatch],
  );
}
