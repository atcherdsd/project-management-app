import { Idictionary } from '../types/dictionaryTypes';

const dictionary: Idictionary = {
  Navbar: {
    EN: {
      signin: 'Sign in',
      signup: 'Sign Up',
      welcome: 'Welcome',
      main: 'Go to Main Page',
      edit: 'Edit Profile',
      signout: 'Sign Out',
      newboard: 'Create new board',
    },
    RU: {
      signin: 'Войти',
      signup: 'Зарегестрироваться',
      welcome: 'Добро пожаловать',
      main: 'Главная страница',
      edit: 'Профиль',
      signout: 'Выйти',
      newboard: 'Новая доска',
    },
  },
  SighUpForm: {
    EN: {
      formWelcome: 'Get unlimited access to your board',
      formLabelName: 'Name',
      formLogin: 'Login',
      formPassword: 'Password',
      formSignUp: 'SignUp',
      formRequireMsg: 'This field is required',
      formOnlyLetter: 'Should contains only letters',
      formMinLegthNameMsg: 'Should contains greater then 2 symbols',
      formMinLengthMsg: 'Should contains greater then 5 symbols',
      formLoginPatternMsg: 'Should contains english letters and(or) numbers',
      formPasswordValidateMsg: 'Should contains one or greater then numbers',
      formRegistered: 'Already registered?',
      formSignIn: 'SignIn',
    },
    RU: {
      formWelcome: 'Получите неограниченный доступ к вашей доске',
      formLabelName: 'Имя',
      formLogin: 'Логин',
      formPassword: 'Пароль',
      formSignUp: 'Зарегистрироваться',
      formRequireMsg: 'Это поле обязательно к заполнению',
      formOnlyLetter: 'Должен содержать только буквы',
      formMinLegthNameMsg: 'Должен содержать более 2 символов',
      formMinLengthMsg: 'Должен содержать более 5 символов',
      formLoginPatternMsg: 'Должен содержать английские буквы и(или) цифры',
      formPasswordValidateMsg: 'Должен содержать одно или больше чисел',
      formRegistered: 'Уже зарегистрированны?',
      formSignIn: 'Войти',
    },
  },
};

export default dictionary;
