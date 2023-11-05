import React, { useMemo } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
  typeStyleBtn?: 'primary' | 'transparent' | 'success';
}

function Button(props: ButtonProps) {
  const { children, className, typeStyleBtn, ...rest } = props;

  const buttonClassName = useMemo(() => {
    let str = styles['button'];
    if (typeStyleBtn) str += ` ${styles[typeStyleBtn]}`;
    if (className) str += ` ${className}`;
    return str;
  }, [typeStyleBtn, className]);

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
}

export default Button;
