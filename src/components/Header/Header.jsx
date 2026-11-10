import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import logoMark from '../../assets/logo-mark.svg';
import arrowIcon from '../../assets/icon-arrow-right.svg';
import styles from './Header.module.css';

/**
 * Шапка сайта (Header Navigation): логотип, пункты меню с иконками,
 * статус занятости, аватар и кнопка «Связаться».
 * Активный пункт меню хранится в локальном состоянии activeId.
 */
function Header({ navItems, avatar, status = '', onContactClick }) {
  const [activeId, setActiveId] = useState(navItems[0]?.id);

  return (
    <header className={styles.header}>
      <a href="#home" className={styles.logo} aria-label="aykhan.dev — на главную">
        <img src={logoMark} alt="" width="36" height="36" />
        <span>
          aykhan<span className={styles.logoAccent}>.dev</span>
        </span>
      </a>

      <nav aria-label="Основное меню">
        <ul className={styles.nav}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={item.id === activeId ? `${styles.navItem} ${styles.active}` : styles.navItem}
                aria-current={item.id === activeId ? 'page' : undefined}
                onClick={() => setActiveId(item.id)}
              >
                <Icon src={item.icon} size={18} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        {status && <span className={styles.status}>{status}</span>}
        <img src={avatar} alt="Фото специалиста" className={styles.avatar} />
        <Button label="Связаться" icon={arrowIcon} onClick={onContactClick} />
      </div>
    </header>
  );
}

Header.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  avatar: PropTypes.string.isRequired,
  status: PropTypes.string,
  onContactClick: PropTypes.func,
};

export default Header;
