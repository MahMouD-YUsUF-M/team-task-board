import { useEffect, useReducer, type ReactNode } from 'react';
import { loadInitialState, saveState } from './storage';
import { TaskDispatchContext, TaskStateContext } from './taskContexts';
import { tasksReducer } from './tasksReducer';

export function TaskProvider({ children }: { children: ReactNode }) {
  // Lazy initializer: the 3rd argument runs once on mount, so localStorage is
  // read once, not on every render.
  const [state, dispatch] = useReducer(tasksReducer, undefined, loadInitialState);

  // Save tasks + filters every time they change.
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}
