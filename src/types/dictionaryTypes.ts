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

interface IMainPageLanguage {
  boards: string;
}

interface IBoardLanguage {
  created: string;
  delete: string;
}

interface IBorardPageLanguage {
  board: string;
  addColumn: string;
  back: string;
}

interface IColumnHeaderLanguage {
  deleteCol: string;
  createTask: string;
}

interface ITaskLanguage {
  deleteTask: string;
}

interface ILanguage {
  Navbar: INavbarLanguage;
  SignUpForm: ISignUpFormLanguage;
  MainPage: IMainPageLanguage;
  Board: IBoardLanguage;
  BoardPage: IBorardPageLanguage;
  ColumnHeader: IColumnHeaderLanguage;
  Task: ITaskLanguage;
}

export interface Idictionary {
  EN: ILanguage;
  RU: ILanguage;
}
