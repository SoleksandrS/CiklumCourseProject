import { useCallback, useMemo } from 'react';
import { useComponentVisible } from '../../hooks';

import styles from './Select.module.scss';

type Option = {
  title: string;
  value: string;
};

interface SelectProps {
  options: Option[];
  onSelect: (value: string) => void;
  selectedValue: string;
  placeholder?: string;
}

function Select(props: SelectProps) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const selectedOption = useMemo(
    () => props.options.find((option) => option.value === props.selectedValue),
    [props.options, props.selectedValue]
  );

  const displayText = useMemo(() => {
    if (selectedOption) return selectedOption.title;
    if (props.placeholder) return props.placeholder;
    return 'Select';
  }, [selectedOption, props.placeholder]);

  const displayClassName = useMemo(() => {
    let str = styles['display'];
    if (isComponentVisible) str += ` ${styles['active']}`;
    return str;
  }, [isComponentVisible]);

  const onSelect = useCallback(
    (value: string) => {
      props.onSelect(value);
      setIsComponentVisible(false);
    },
    [props, setIsComponentVisible]
  );

  return (
    <div className={styles['select']} ref={ref}>
      <div className={displayClassName} onClick={() => setIsComponentVisible((prev) => !prev)}>
        {displayText}
        <span className={styles['arrow']}></span>
      </div>
      {isComponentVisible && (
        <ul className={styles['option-list']}>
          {props.options.map((option, idx) => (
            <li
              key={`option-${idx}`}
              className={styles['option']}
              onClick={() => onSelect(option.value)}>
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
