import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './baseUrl';
import { IBoard } from '../types/boardTypes';
import token from './jwt';

export const boardsCalls = createApi({
  reducerPath: 'boardsCalls',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${token}`);
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
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});

export const { useGetAllBoardsQuery, useCreateNewBoardMutation, useDeleteBoardMutation } =
  boardsCalls;
