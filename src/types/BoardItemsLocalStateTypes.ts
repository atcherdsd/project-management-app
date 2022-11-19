import { ITask } from './boardTypes';

export type ColumnStateType = Map<string, ITask[]>;
export type ColumnPayloadProps = [string, ITask[]];
