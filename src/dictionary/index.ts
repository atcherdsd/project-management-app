import { Idictionary } from '../types/dictionaryTypes';
import { benefits } from '../components/pages/WelcomePage/Description/benefitsData';

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
    WelcomePage: {
      titleTagline: 'Easy to create, easy to follow',
      titleProposal1:
        'Try the most efficient processes, to organize your personal and professional life.',
      titleProposal2: 'Discover OneTeam project management system',
      descriptSubtitle: 'PROJECT MANAGEMENT',
      descriptDeclarationTitle: 'Your base for classic or agile project management',
      descriptDeclarationContent:
        'OneTeam management system allows you to plan a project and assign team members to complete tasks on time, collaborate and manage schedules',
      descriptBenefitsTitle: 'The team management system includes',
      descriptBenefitTitle1: benefits[0].titleEn,
      descriptBenefitContent1: benefits[0].descriptionEn,
      descriptBenefitTitle2: benefits[1].titleEn,
      descriptBenefitContent2: benefits[1].descriptionEn,
      descriptBenefitTitle3: benefits[2].titleEn,
      descriptBenefitContent3: benefits[2].descriptionEn,
      descriptBenefitTitle4: benefits[3].titleEn,
      descriptBenefitContent4: benefits[3].descriptionEn,
      ourTeam: 'Application development team',
    },
    NotFoundPage: {
      declaration: 'Requested page not found',
      exitMessage: "You'll be redirected to the home page via",
      seconds: 'sec',
    },
  },
  RU: {
    Navbar: {
      signin: 'Войти',
      signup: 'Зарегистрироваться',
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
      formRegistered: 'Уже зарегистрированы?',
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
    WelcomePage: {
      titleTagline: 'Легко создавать, легко следовать',
      titleProposal1:
        'Попробуйте самые эффективные процессы, чтобы организовать свою личную и профессиональную жизнь.',
      titleProposal2: 'Откройте для себя систему управления проектами OneTeam',
      descriptSubtitle: 'УПРАВЛЕНИЕ ПРОЕКТОМ',
      descriptDeclarationTitle: 'Ваша база для классического или гибкого управления проектами',
      descriptDeclarationContent:
        'Система управления командой OneTeam позволяет планировать проект и назначать членов команды для выполнения задач в заданные сроки, сотрудничать и управлять расписаниями',
      descriptBenefitsTitle: 'Система управления командой включает',
      descriptBenefitTitle1: benefits[0].titleRu,
      descriptBenefitContent1: benefits[0].descriptionRu,
      descriptBenefitTitle2: benefits[1].titleRu,
      descriptBenefitContent2: benefits[1].descriptionRu,
      descriptBenefitTitle3: benefits[2].titleRu,
      descriptBenefitContent3: benefits[2].descriptionRu,
      descriptBenefitTitle4: benefits[3].titleRu,
      descriptBenefitContent4: benefits[3].descriptionRu,
      ourTeam: 'Команда разработчиков приложения',
    },
    NotFoundPage: {
      declaration: 'Запрашиваемая страница не найдена',
      exitMessage: 'Вы будете перенаправлены на домашнюю страницу через',
      seconds: 'сек',
    },
  },
};

export default dictionary;
