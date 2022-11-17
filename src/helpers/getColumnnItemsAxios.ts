import token from '../API/jwt';
import baseUrl from '../API/baseUrl';
import axios from 'axios';
import { ITask } from '../types/taskType';

const getColumnItemsAxios = async (boardId: string, columnId: string): Promise<ITask[]> => {
  const sourceColumn = await axios.get(`${baseUrl}/boards/${boardId}/columns/${columnId}/tasks`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return sourceColumn.data;
};

export default getColumnItemsAxios;
