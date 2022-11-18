import token from '../API/jwt';
import baseUrl from '../API/baseUrl';
import axios from 'axios';
import { ITask } from '../types/taskType';
import { IColumn } from '../types/columnType';

export const getColumnItemsAxios = async (boardId: string, columnId: string): Promise<ITask[]> => {
  const tasks = await axios.get(`${baseUrl}/boards/${boardId}/columns/${columnId}/tasks`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return tasks.data;
};

export const getBoardColumnsAxios = async (boardId: string): Promise<IColumn[]> => {
  const columns = await axios.get(`${baseUrl}/boards/${boardId}/columns/`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return columns.data;
};
