import { Idictionary } from '../types/dictionaryTypes';
import { benefits } from '../components/pages/WelcomePage/Description/benefits';

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
  WelcomePage: {
    EN: {
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
    },
    RU: {
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
    },
  },
};

export default dictionary;
