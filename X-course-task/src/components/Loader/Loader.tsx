import { useMemo } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  size?: 'normal' | 'large';
}

function Loader(props: LoaderProps) {
  const loaderClassName = useMemo(() => {
    let str = styles['loader'];
    if (props.size && props.size !== 'normal') str += ` ${styles['large']}`;
    return str;
  }, [props.size]);

  return (
    <div className={loaderClassName}>
      {new Array(8).fill(undefined).map((_, idx) => (
        <div key={`dote-${idx}`} className={`${styles['dote']} ${styles[`pos-${idx + 1}`]}`}></div>
      ))}
    </div>
  );
}

export default Loader;
