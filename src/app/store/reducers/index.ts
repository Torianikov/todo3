import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { taskReducer } from '../reducers/task.reducers';
import { TaskState } from '../state/task.state'

export interface State {
  task: TaskState
}

export const reducers: ActionReducerMap<State> = {
  task: taskReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
