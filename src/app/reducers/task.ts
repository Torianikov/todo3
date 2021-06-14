import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

import {Task} from '../model/tast'

export const addTask = createAction('[TASK] add new action', props<{textNewTask: string, executionClient: string}>());
export const clear = createAction('[TASK] clear');
export const deleteTask = createAction('[TASK] delete task', props<{index: number}>());
export const editTask = createAction('[Task] edit task', props<{index: number, upadateTask: string, upadateExecution: string}>());

export interface TaskState{
    todoList: Task[];
    idIncrement: number;
}

export const initialState: TaskState = {
    todoList: [],
    idIncrement: 0
}

export const taskReducer = createReducer(
    initialState,
    on(addTask, (state, {textNewTask, executionClient}) => ({
        ...state,
        idIncrement: state.idIncrement + 1,
        todoList: [...state.todoList,
        {
          id: state.idIncrement,
          text: textNewTask,
          execution: executionClient
        }]

    })),
    on(clear, state => ({
        ...state,
        idIncrement: 0,
        todoList: []

    })),
    on(deleteTask, (state, {index}) =>{
      let arr = [...state.todoList]
      // arr[]
      return{
          ...state,
        todoList:  state.todoList.slice(0, index).concat(state.todoList.slice(index + 1, state.todoList.length)),

    }}),
    on(editTask, (state,{index, upadateTask, upadateExecution}) => {
        let arr = [...state.todoList];
        arr[index] ={
          id: index,
          text: upadateTask,
          execution: upadateExecution
        }
        return {
        ...state,
         todoList: arr
    }})
);

export const featureSelector = createFeatureSelector<TaskState>('task');

export const taskSelector = createSelector(
    featureSelector,
    state => state.todoList
);

// export const executionSelector = createSelector(
//     featureSelector,
//     state => state.execution
// )
