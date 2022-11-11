export interface INavbarLanguage {
  signinup: string;
  welcome: string;
  main: string;
  edit: string;
}

export interface INavbar {
  EN: INavbarLanguage;
  RU: INavbarLanguage;
}

export interface Idictionary {
  Navbar: INavbar;
}
