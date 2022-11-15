import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type FormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type FormValues = {
  name?: string;
  login: string;
  password: string;
  _id?: string;
};

export type SignUpProps = {
  handlerSubmit: (data: FormValues) => void;
  isLoading: boolean;
};
export type Body = {
  [key: string]: string;
};
export type QueryProps = {
  path: string;
  patch: Body;
};

export type StateSignUp = {
  signUpData: FormValues;
};

export type ModalProp = {
  error?: FetchBaseQueryError;
};
