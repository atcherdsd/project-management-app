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

export interface Idictionary {
  Navbar: INavbar;
}