interface INavbarLanguage {
  signin: string;
  signup: string;
  welcome: string;
  main: string;
  edit: string;
  signout: string;
  newboard: string;
}

interface ISignUpFormLanguage {
  formWelcome: string;
  formLabelName: string;
  formLogin: string;
  formPassword: string;
  formSignUp: string;
  formRequireMsg: string;
  formOnlyLetter: string;
  formMinLengthMsg: string;
  formLoginPatternMsg: string;
  formPasswordValidateMsg: string;
  formRegistered: string;
}

export interface ILanguage {
  Navbar: INavbarLanguage;
  SignUpForm: ISignUpFormLanguage;
}

export interface Idictionary {
  EN: ILanguage;
  RU: ILanguage;
}
