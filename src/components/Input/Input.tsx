import React from 'react';
import { Input as AntInput } from 'antd';

type InputStyles = {
  color?: string;
  background?: string;
  borderRadius?: string;
  backgroundColor?: string;
  border?: string;
}

const defaultStyles: InputStyles = {
  borderRadius: '10.92px',
  border: '0.73px #FF00FF solid',
  backgroundColor: '#000000',
  color: '#FFFFFF',
};

const disabledStyles: InputStyles = {
  background: '#2F0140',
  borderRadius: '10.92px',
  border: '1px solid black',
  color: '#FFFFFF',
};

interface CustomInputProps {
  value?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
}

export const Input: React.FC<CustomInputProps> = ({ style = {}, disabled = false, ...props }) => {
  // Use disabled styles if disabled prop is true, otherwise use default styles. Then merge with provided styles.
  const mergedStyles = { ...(disabled ? disabledStyles : defaultStyles), ...style };

  return <AntInput style={mergedStyles} disabled={disabled} {...props} />;
};
