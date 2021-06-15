import { createReducer, on } from '@ngrx/store';
import {add, clear, deleteOne, edit} from '../actions/task.action'
import { initialState } from '../state/task.state';

export const taskReducer = createReducer(
    initialState,
    on(add, (state, {textNewTask, executionClient}) => ({
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
    on(deleteOne, (state, {index}) =>{
        
        let indexNewArr = 0  
        let arr = [...state.todoList].filter((item) => item.id !== index);
    //   .map(item => item.id = indexNewArr + 1 );
        return{
          ...state,
        todoList:  arr

    }}),
    on(edit, (state,{index, upadateTask, upadateExecution}) => {
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