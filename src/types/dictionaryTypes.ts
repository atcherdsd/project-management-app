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

export interface IWelcomePageLanguage {
  titleTagline: string;
  titleProposal1: string;
  titleProposal2: string;
}

export interface IWelcomePage {
  EN: IWelcomePageLanguage;
  RU: IWelcomePageLanguage;
}

export interface Idictionary {
  Navbar: INavbar;
  WelcomePage: IWelcomePage;
}
