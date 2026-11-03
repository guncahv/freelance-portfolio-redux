import Header from './components/Header/Header';
import Button from './components/Button/Button';
import ProjectCard from './components/ProjectCard/ProjectCard';
import ContactForm from './components/ContactForm/ContactForm';
import Notification from './components/Notification/Notification';
import projects from './data/projects';
import navItems from './data/navigation';
import photo from './assets/photo-specialist@1x.jpg';
import arrowIcon from './assets/icon-arrow-right.svg';
import styles from './App.module.css';

function App() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header
        navItems={navItems}
        avatar={photo}
        status="Открыт к проектам"
        onContactClick={() => scrollTo('contact')}
      />

      <main className={styles.page}>
        <section id="home" className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.badge}>Фриланс-разработчик · React · Node.js</span>
            <h1 className={styles.h1}>Создаю быстрые веб-приложения под ключ</h1>
            <p className={styles.lead}>
              Привет! Я Айхан. Помогаю стартапам и малому бизнесу запускать сайты и веб-сервисы: от прототипа в
              Figma до релиза.
            </p>
            <div className={styles.heroActions}>
              <Button label="Смотреть проекты" icon={arrowIcon} onClick={() => scrollTo('projects')} />
              <Button label="Скачать резюме" variant="secondary" />
            </div>
          </div>
          <img src={photo} alt="Айхан Рахманкулов, фриланс-разработчик" className={styles.photo} />
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.h2}>Избранные проекты</h2>
          <div className={styles.grid}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                meta={project.meta}
              />
            ))}
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <div>
            <h2 className={styles.h2}>Обсудим ваш проект?</h2>
            <p className={styles.contactText}>Расскажите о задаче — заявка уйдёт сразу, а статус отправки появится в уведомлении.</p>
          </div>
          <ContactForm />
        </section>
      </main>

      <Notification />
    </>
  );
}

export default App;
