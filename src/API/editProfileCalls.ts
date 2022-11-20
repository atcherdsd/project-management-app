import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryProps, ResponseStateSignUp } from '../types/formTypes';
import baseUrl from './baseUrl';

export const getUser = createApi({
  reducerPath: 'getUser',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<ResponseStateSignUp, QueryProps>({
      query: (props) => ({
        url: `${props.path}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation<ResponseStateSignUp, QueryProps>({
      query: (props) => ({
        url: `${props.path}`,
        method: 'PUT',
        body: props.patch,
      }),
    }),
    deleteUser: builder.mutation<ResponseStateSignUp, QueryProps>({
      query: (props) => ({
        url: `${props.path}`,
        method: 'DELETE',
        body: props.patch,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = getUser;
