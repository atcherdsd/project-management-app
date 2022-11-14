import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './baseUrl';
import { IColumn } from '../types/columnType';

export const columnsCalls = createApi({
  reducerPath: 'columnsCalls',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzIyM2UyMDA1NTUxNzU0ZWRiMWNjMCIsImxvZ2luIjoiYWd0dWdjaGlrIiwiaWF0IjoxNjY4NDI1MDY4LCJleHAiOjE2Njg0NjgyNjh9.prRiTbieqZ2sL5t6ciFprKyJXOlwrEtdIG99eyDe5ok'
      );
    },
  }),
  tagTypes: ['Columns'],
  endpoints: (builder) => ({
    getAllColumns: builder.query<IColumn[], string>({
      query: (boardId) => ({
        url: `boards/${boardId}/columns`,
        method: 'GET',
      }),
      providesTags: () => ['Columns'],
    }),
    createNewColumn: builder.mutation({
      query: (props) => ({
        url: `boards/${props.boardId}/columns`,
        method: 'POST',
        body: props.body,
      }),
      invalidatesTags: ['Columns'],
    }),
    deleteColumn: builder.mutation({
      query: (props) => ({
        url: `boards/${props.boardId}/columns/${props.columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Columns'],
    }),
  }),
});

export const { useGetAllColumnsQuery, useCreateNewColumnMutation, useDeleteColumnMutation } =
  columnsCalls;
