import {Task} from '../../model/tast'

export interface TaskState{
    todoList: Task[];
    idIncrement: number;
}

export const initialState: TaskState = {
    todoList: [],
    idIncrement: 0
}