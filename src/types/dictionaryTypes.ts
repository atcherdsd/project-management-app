import { warning } from '@remix-run/router';

export interface INavbarLanguage {
  signin: string;
  signup: string;
  welcome: string;
  main: string;
  edit: string;
  signout: string;
  newboard: string;
}

export interface INavbar {
  EN: INavbarLanguage;
  RU: INavbarLanguage;
}

export interface ISighUpFormLanguage {
  formWelcome: string;
  formLabelName: string;
  formLogin: string;
  formPassword: string;
  formSignUp: string;
  formRequireMsg: string;
  formOnlyLetter: string;
  formMinLegthNameMsg: string;
  formMinLengthMsg: string;
  formLoginPatternMsg: string;
  formPasswordValidateMsg: string;
  formRegistered: string;
  formSignIn: string;
  edit?: string;
  updateBtn?: string;
  deleteBtn?: string;
}

export interface ISighUpForm {
  EN: ISighUpFormLanguage;
  RU: ISighUpFormLanguage;
}

export interface IModal {
  EN: IModalLanguage;
  RU: IModalLanguage;
}

export interface IModalLanguage {
  warning: string;
  confirmBtn: string;
  disconfirmBtn: string;
}

export interface Idictionary {
  Navbar: INavbar;
  SighUpForm: ISighUpForm;
  Modal: IModal;
}
