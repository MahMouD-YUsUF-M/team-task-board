import { createContext, type Dispatch } from 'react';
import type { State, TaskAction } from './tasksReducer';

export const TaskStateContext = createContext<State | null>(null);
export const TaskDispatchContext = createContext<Dispatch<TaskAction> | null>(null);
