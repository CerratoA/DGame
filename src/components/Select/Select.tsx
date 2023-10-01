import { Select as AntSelect } from 'antd';
import React from 'react';

const defaultStyles: React.CSSProperties = {
  width: '100%',
  background: '#2F0140; border-radius: 10.92px'
};

type OptionType = {
  value: string;
  label: string;
};

type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: OptionType[];
  style?: React.CSSProperties;
};

export const Select: React.FC<SelectProps> = ({ value, onChange, options, style = {} }) => {
  const mergedStyles: React.CSSProperties = {
    ...defaultStyles,
    ...style,
  };

  return (
    <AntSelect
      style={mergedStyles}
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <AntSelect.Option key={option.value} value={option.value}>
          {option.label}
        </AntSelect.Option>
      ))}
    </AntSelect>
  );
};
