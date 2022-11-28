export type NavbarState = {
  isOpenedMenu: boolean;
  hasToken: boolean;
  userId: string | null;
};

export interface IRoute {
  path: string;
  element: JSX.Element;
}

export interface IRoutes {
  public: IRoute[];
  private: IRoute[];
}
