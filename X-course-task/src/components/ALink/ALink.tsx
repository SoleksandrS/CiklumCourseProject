import React, { useMemo } from 'react';

import styles from './ALink.module.scss';

interface ALinkProps {
  children?: React.ReactNode;
  className?: string;
  href: string;
  target?: '_blank';
  specUnderline?: boolean;
}

function ALink(props: ALinkProps) {
  const { children, className, specUnderline, ...rest } = props;

  const linkClassName = useMemo(() => {
    let str = styles['link'];
    if (className) str += ` ${className}`;
    if (specUnderline) str += ` ${styles['spec-underline']}`;
    return str;
  }, [className, specUnderline]);

  return (
    <a className={linkClassName} {...rest}>
      {children}
    </a>
  );
}

export default ALink;
