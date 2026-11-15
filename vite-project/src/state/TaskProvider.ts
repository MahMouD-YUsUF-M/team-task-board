import { useEffect, useReducer, type ReactNode } from 'react';
import { loadInitialState, saveState } from './storage';
import { TaskDispatchContext, TaskStateContext } from './taskContexts';
import { tasksReducer } from './tasksReducer';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, undefined, loadInitialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}
