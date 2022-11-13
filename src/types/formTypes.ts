export type FormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type FormValues = {
  name?: string;
  login: string;
  password: string;
};

export type SignUpProps = {
  handlerSubmit: (data: FormValues) => void;
};
type Body = {
  [key: string]: string;
};
export type QueryProps = {
  path: string;
  patch: Body;
};
