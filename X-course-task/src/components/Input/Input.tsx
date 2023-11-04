import { useMemo } from 'react';

import styles from './Input.module.scss';

interface InputProps {
  className?: string;
  type?: 'text' | 'number';
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string | number;
  max?: string | number;
  refObj?: React.RefObject<HTMLInputElement>;
}

function Input(props: InputProps) {
  const { className, refObj, ...rest } = props;

  const inputClassName = useMemo(() => {
    let str = styles['input'];
    if (className) str += ` ${className}`;
    return str;
  }, [className]);

  return <input className={inputClassName} ref={refObj} {...rest} />;
}

export default Input;
