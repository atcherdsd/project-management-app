interface INavbarLanguage {
  signin: string;
  signup: string;
  welcome: string;
  main: string;
  edit: string;
  signout: string;
  newboard: string;
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

interface IModalLanguage {
  warning: string;
  confirmBtn: string;
  disconfirmBtn: string;
  title: string;
  owner: string;
  createBoardBtn: string;
  cancelBtn: string;
  createColumnBtn: string;
  inviteUser: string;
  task: string;
}

interface ILanguage {
  Navbar: INavbarLanguage;
  SignUpForm: ISighUpFormLanguage;
  MainPage: IMainPageLanguage;
  Board: IBoardLanguage;
  BoardPage: IBorardPageLanguage;
  ColumnHeader: IColumnHeaderLanguage;
  Task: ITaskLanguage;
  WelcomePage: IWelcomePageLanguage;
  NotFoundPage: INotFoundPageLanguage;
  Modal: IModalLanguage;
}

export interface Idictionary {
  EN: ILanguage;
  RU: ILanguage;
}
