import { ALink } from '../';

import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['inner']}>
        <p className={styles['text']}>
          Виконано в{' '}
          <ALink href="https://prometheus.org.ua/" target="_blank" specUnderline>
            Prometheus
          </ALink>{' '}
          © 2023
        </p>
      </div>
    </footer>
  );
}

export default Footer;
