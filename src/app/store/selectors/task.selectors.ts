import { createFeatureSelector, createSelector } from "@ngrx/store";
import {TaskState} from '../state/task.state'


export const featureSelector = createFeatureSelector<TaskState>('task');

export const taskSelector = createSelector(
    featureSelector,
    state => state.todoList
);