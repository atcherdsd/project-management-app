import type { FormValues } from '../types/formTypes';

export default function StateSignUpDataToLS(responseData: FormValues) {
  localStorage.setItem('password', String(responseData.password));
  localStorage.setItem('login', responseData.login);
}
