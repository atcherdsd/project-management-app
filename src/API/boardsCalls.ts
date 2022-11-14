import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './baseUrl';
import { IBoard } from '../types/boardType';

export const boardsCalls = createApi({
  reducerPath: 'boardsCalls',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzIyM2UyMDA1NTUxNzU0ZWRiMWNjMCIsImxvZ2luIjoiYWd0dWdjaGlrIiwiaWF0IjoxNjY4NDI1MDY4LCJleHAiOjE2Njg0NjgyNjh9.prRiTbieqZ2sL5t6ciFprKyJXOlwrEtdIG99eyDe5ok'
      );
    },
  }),
  tagTypes: ['Boards'],
  endpoints: (builder) => ({
    getAllBoards: builder.query<IBoard[], null>({
      query: () => ({
        url: 'boards',
        method: 'GET',
      }),
      providesTags: () => ['Boards'],
    }),
    createNewBoard: builder.mutation({
      query: (props) => ({
        url: 'boards',
        method: 'POST',
        body: props.body,
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});

export const { useGetAllBoardsQuery, useCreateNewBoardMutation } = boardsCalls;
