import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import heartIcon from '../../assets/icon-heart.svg';
import heartFilledIcon from '../../assets/icon-heart-filled.svg';
import arrowIcon from '../../assets/icon-arrow-right.svg';
import styles from './ProjectCard.module.css';

/**
 * Карточка проекта. Все данные (заголовок, описание, изображение, теги, подпись)
 * приходят через props. Локальное состояние isFavorite — вариант Favorite: Off / On.
 */
function ProjectCard({ title, description, image, tags = [], meta = '', caseUrl = '#' }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.cover}>
        <img src={image} alt={`Обложка проекта «${title}»`} className={styles.image} />
        <button
          type="button"
          className={isFavorite ? `${styles.favorite} ${styles.favoriteOn}` : styles.favorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <Icon src={isFavorite ? heartFilledIcon : heartIcon} size={18} />
        </button>
      </div>

      <div className={styles.body}>
        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <a href={caseUrl} className={styles.link}>
            Смотреть кейс
            <Icon src={arrowIcon} size={16} />
          </a>
          {meta && <span className={styles.meta}>{meta}</span>}
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.string,
  caseUrl: PropTypes.string,
};

export default ProjectCard;
