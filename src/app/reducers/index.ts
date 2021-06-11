import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { taskReducer, TaskState } from './task';

export interface State {
  task: TaskState
}

export const reducers: ActionReducerMap<State> = {
  task: taskReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
