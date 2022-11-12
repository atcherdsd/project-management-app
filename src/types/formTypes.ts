export type FormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type FormValues = {
  login: string;
  password: string;
};
