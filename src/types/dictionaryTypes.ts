export interface INavbarLanguage {
  signin: string;
  signup: string;
  welcome: string;
  main: string;
  edit: string;
  signout: string;
  newboard: string;
  formWelcome:string;
  formLabelName:string;
  formLogin:string;
  formPassword:string;
  formSignUp:string;
  formRequireMsg:string;
  formOnlyLetter:string;
  formMinLengthMsg:string;
  formLoginPatternMsg:string;
  formPasswordValidateMsg:string;
  formRegistered:string;
}

export interface INavbar {
  EN: INavbarLanguage;
  RU: INavbarLanguage;
}

export interface Idictionary {
  Navbar: INavbar;
}
