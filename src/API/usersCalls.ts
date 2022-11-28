import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UsersResponse, TranformUsersResponse } from '../types/modalType';
import baseUrl from './baseUrl';
import { filterUsersResponse } from '../helpers/filterUsersResponse';

export const usersCalls = createApi({
  reducerPath: 'usersCalls',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse | TranformUsersResponse, string>({
      query: (props) => ({
        url: `${props}`,
        method: 'GET',
      }),
      transformResponse: (response: UsersResponse) => {
        const transformResponse = {
          currentUser: filterUsersResponse(response),
          users: response,
        };
        return transformResponse;
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersCalls;
