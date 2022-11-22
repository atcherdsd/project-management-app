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

interface IWelcomePageLanguage {
  titleTagline: string;
  titleProposal1: string;
  titleProposal2: string;
  descriptSubtitle: string;
  descriptDeclarationTitle: string;
  descriptDeclarationContent: string;
  descriptBenefitsTitle: string;
  descriptBenefitTitle1: string;
  descriptBenefitContent1: string;
  descriptBenefitTitle2: string;
  descriptBenefitContent2: string;
  descriptBenefitTitle3: string;
  descriptBenefitContent3: string;
  descriptBenefitTitle4: string;
  descriptBenefitContent4: string;
  ourTeam: string;
  aboutCourse1: string;
  aboutCourse2: string;
}

interface INotFoundPageLanguage {
  declaration: string;
  exitMessage: string;
  seconds: string;
}

interface ILanguage {
  Navbar: INavbarLanguage;
  SignUpForm: ISignUpFormLanguage;
  MainPage: IMainPageLanguage;
  Board: IBoardLanguage;
  BoardPage: IBorardPageLanguage;
  ColumnHeader: IColumnHeaderLanguage;
  Task: ITaskLanguage;
  WelcomePage: IWelcomePageLanguage;
  NotFoundPage: INotFoundPageLanguage;
}

export interface Idictionary {
  EN: ILanguage;
  RU: ILanguage;
}
