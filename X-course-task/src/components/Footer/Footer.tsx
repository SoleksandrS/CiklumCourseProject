import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['inner']}>
        <p className={styles['text']}>
          Виконано в{' '}
          <a href="https://prometheus.org.ua/" className={styles['link']}>
            Prometheus
          </a>{' '}
          © 2023
        </p>
      </div>
    </footer>
  );
}

export default Footer;
