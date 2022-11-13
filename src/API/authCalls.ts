import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryProps } from '../types/formTypes';
import baseUrl from './baseUrl';

export const authCalls = createApi({
  reducerPath: 'authCalls',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
    },
  }),
  endpoints: (builder) => ({
    signUpAuth: builder.query<QueryProps, QueryProps>({
      query: (props) => {
        if (props.patch.login) {
          return {
            url: `${props.path}`,
            method: 'POST',
            body: props.patch,
          };
        } else return 'false';
      },
    }),
    signInAuth: builder.query<QueryProps, QueryProps>({
      query: (props) => ({
        url: `${props.path}`,
        method: 'POST',
        body: props.patch,
      }),
    }),
  }),
});

export const { useSignUpAuthQuery, useSignInAuthQuery } = authCalls;
