import { createAction, props } from "@ngrx/store";

export const add = createAction('[TASK] add new action', props<{textNewTask: string, executionClient: string}>());
export const clear = createAction('[TASK] clear');
export const deleteOne = createAction('[TASK] delete task', props<{index: number}>());
export const edit = createAction('[Task] edit task', props<{index: number, upadateTask: string, upadateExecution: string}>());