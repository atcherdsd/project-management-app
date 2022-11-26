import { Idictionary } from '../types/dictionaryTypes';

const dictionary: Idictionary = {
  EN: {
    Navbar: {
      signin: 'Sign in',
      signup: 'Sign Up',
      welcome: 'Welcome',
      main: 'Go to Main Page',
      edit: 'Edit Profile',
      signout: 'Sign Out',
      newboard: 'Create new board',
    },
    SignUpForm: {
      formWelcome: 'Get unlimited access to your board',
      formLabelName: 'Name',
      formLogin: 'Login',
      formPassword: 'Password',
      formSignUp: 'SignUp',
      formRequireMsg: 'This field is required',
      formOnlyLetter: 'Should contains only letters',
      formMinLengthMsg: 'Should contains greater then 5 symbols',
      formLoginPatternMsg: 'Should contains english letters and(or) numbers',
      formPasswordValidateMsg: 'Should contains one or greater then numbers',
      formRegistered: 'Already registered?',
    },
    MainPage: {
      boards: 'Boards',
    },
    Board: {
      created: 'Created by',
      delete: 'Delete',
    },
    BoardPage: {
      board: 'Board',
      addColumn: 'Add Column',
      back: 'Back to Main',
    },
    ColumnHeader: {
      deleteCol: 'Delete column',
      createTask: 'Create task',
    },
    Task: {
      deleteTask: 'Delete task',
    },
    AddBoard: {
      add: 'Add',
    },
  },
  RU: {
    Navbar: {
      signin: 'Войти',
      signup: 'Зарегестрироваться',
      welcome: 'Добро пожаловать',
      main: 'Главная страница',
      edit: 'Профиль',
      signout: 'Выйти',
      newboard: 'Новая доска',
    },
    SignUpForm: {
      formWelcome: 'Получите неограниченный доступ к вашей доске',
      formLabelName: 'Имя',
      formLogin: 'Логин',
      formPassword: 'Пароль',
      formSignUp: 'Зарегистрироваться',
      formRequireMsg: 'Это поле обязательно к заполнению',
      formOnlyLetter: 'Должен содержать только буквы',
      formMinLengthMsg: 'Должен содержать более 5 символов',
      formLoginPatternMsg: 'Должен содержать английские буквы и(или) цифры',
      formPasswordValidateMsg: 'Должен содержать одно или больше чисел',
      formRegistered: 'Уже зарегистрированны?',
    },
    MainPage: {
      boards: 'Доски',
    },
    Board: {
      created: 'Создал',
      delete: 'Удалить',
    },
    BoardPage: {
      board: 'Доска',
      addColumn: 'Добавить колонку',
      back: 'На главную',
    },
    ColumnHeader: {
      deleteCol: 'Удалить колонку',
      createTask: 'Создать задание',
    },
    Task: {
      deleteTask: 'Удалить задание',
    },
    AddBoard: {
      add: 'Добавить',
    },
  },
};

export default dictionary;
