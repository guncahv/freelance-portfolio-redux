import marketplaceCover from '../assets/project-marketplace.svg';
import crmCover from '../assets/project-crm.svg';
import fintechCover from '../assets/project-fintech.svg';

// Данные проектов портфолио (как в прототипе ЛР №17). В ProjectCard передаются через props.
const projects = [
  {
    id: 'marketplace',
    title: 'Маркетплейс handmade-товаров',
    description: 'Каталог, корзина и кабинет мастера. Загрузка страниц стала быстрее на 40 %.',
    image: marketplaceCover,
    tags: ['React', 'TypeScript', 'Node.js'],
    meta: '2026 · фриланс',
  },
  {
    id: 'crm',
    title: 'CRM для автосервиса',
    description: 'Запись клиентов, учёт запчастей и уведомления в Telegram для сети из 5 станций.',
    image: crmCover,
    tags: ['Vue', 'Laravel', 'MySQL'],
    meta: '2026 · фриланс',
  },
  {
    id: 'fintech',
    title: 'Лендинг финтех-стартапа',
    description: 'Адаптивный лендинг с калькулятором вклада. Конверсия в заявку выросла до 7,8 %.',
    image: fintechCover,
    tags: ['Next.js', 'Tailwind', 'Figma'],
    meta: '2026 · фриланс',
  },
];

export default projects;
