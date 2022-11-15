import type { FormValues } from '../types/formTypes';

export default function StateSignUpDataToLS(responseData: FormValues) {
  localStorage.setItem('name', String(responseData.name));
  localStorage.setItem('login', responseData.login);
  localStorage.setItem('id', String(responseData._id));
}
