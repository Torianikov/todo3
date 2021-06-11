import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

export const addTask = createAction('[TASK] add new action', props<{textNewTask: string, executionClient: string}>());
export const clear = createAction('[TASK] clear');
export const deleteTask = createAction('[TASK] delete task', props<{index: number}>());
export const editTask = createAction('[Task] edit task', props<{index: number, upadateTask: string, upadateExecution: string}>());

export interface TaskState{
    arrTask: string[];
    execution: string[];
}

export const initialState: TaskState = {
    arrTask: [],
    execution: []
}

export const taskReducer = createReducer(
    initialState,
    on(addTask, (state, {textNewTask, executionClient}) => ({
        ...state,
        arrTask: state.arrTask.concat(textNewTask),
        execution: state.execution.concat(executionClient)
        
    })),
    on(clear, state => ({
        ...state,
        arrTask: [],
        execution: []

    })),
    on(deleteTask, (state, {index}) =>({
        ...state,
        arrTask:  state.arrTask.slice(0, index).concat(state.arrTask.slice(index + 1, state.arrTask.length)),
        execution: state.execution.slice(0,index).concat(state.execution.slice(index+1,state.execution.length))
    })),
    on(editTask, (state,{index, upadateTask, upadateExecution}) => {
        const exe = [...state.execution];
        const arr = [...state.arrTask];

        exe[index] = upadateExecution;
        arr[index] = upadateTask;
        return {
        ...state,
        arrTask: arr,
        execution: exe
    }})
);

export const featureSelector = createFeatureSelector<TaskState>('task');

export const taskSelector = createSelector(
    featureSelector,
    state => state.arrTask
);

export const executionSelector = createSelector(
    featureSelector,
    state => state.execution
)