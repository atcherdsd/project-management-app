import axios from 'axios';
import baseUrl from '../API/baseUrl';
import token from '../API/jwt';
import { IReorderTasksArray, IReorderColumnsArray } from '../types/ReorderCallsTypes';

const reorderTasks = (
  sourse: IReorderTasksArray,
  sourceId: string,
  destination?: IReorderTasksArray,
  destinationId?: string
) => {
  const newOrderedSource = sourse.map((item, index) => ({
    _id: item._id,
    order: index,
    columnId: sourceId,
  }));

  if (destination && destinationId) {
    const newOrderedDestination = destination.map((item, index) => ({
      _id: item._id,
      order: index,
      columnId: destinationId,
    }));
    return [...newOrderedSource, ...newOrderedDestination];
  }
  return newOrderedSource;
};

export const reorderTasksCall = (
  sourse: IReorderTasksArray,
  sourceId: string,
  destination?: IReorderTasksArray,
  destinationId?: string
) => {
  const body = reorderTasks(sourse, sourceId, destination, destinationId);
  axios.patch(`${baseUrl}/tasksSet`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const reorderColumns = (columns: IReorderColumnsArray) => {
  const newOrderedColumns = columns.map((item, index) => ({
    _id: item._id,
    order: index,
  }));
  return newOrderedColumns;
};

export const reorderColumnsCall = async (columns: IReorderColumnsArray, refetch: () => void) => {
  const body = reorderColumns(columns);
  await axios.patch(`${baseUrl}/columnsSet`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  refetch();
};
