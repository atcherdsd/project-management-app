import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryPropsGet } from '../types/formTypes';
import baseUrl from './baseUrl';

export const boardsCalls = createApi({
  reducerPath: 'boardsCalls',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBjNGMwMDA1NTUxNzU0ZWRiMWMwMSIsImxvZ2luIjoiTmlraXRhIiwiaWF0IjoxNjY4MzM0ODQ5LCJleHAiOjE2NjgzNzgwNDl9.adkIurUSzWAuNSiSek59ah9BIaFhfSqRrucyOjZCMS0'
      );
    },
  }),
  endpoints: (builder) => ({
    getAllBoards: builder.query<QueryPropsGet, QueryPropsGet>({
      query: (props) => {
        if (props.path === 'boards') {
          return {
            url: `${props.path}`,
            method: 'GET',
          };
        } else return 'false';
      },
    }),
  }),
});

export const { useGetAllBoardsQuery } = boardsCalls;
