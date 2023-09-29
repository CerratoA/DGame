import React from 'react';
import { Typography } from 'antd';

type TextProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const defaultStyles: React.CSSProperties = {
  fontSize: '14px',
  color: 'white',
  marginBottom: '0px',
};

export const Text: React.FC<TextProps> = ({ children, style }) => {
  const combinedStyles = { ...defaultStyles, ...style }; // Merge default styles with provided styles

  return (
    <Typography.Paragraph style={combinedStyles}>
      {children}
    </Typography.Paragraph>
  );
}
