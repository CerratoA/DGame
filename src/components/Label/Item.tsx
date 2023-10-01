import React from 'react';

interface LabelProps {
  children: React.ReactNode;
}

const labelContainerStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left'
};

const labelTextStyle: React.CSSProperties = {
  marginBottom: '5px',
  color: '#888',
};

export const Label: React.FC<LabelProps> = ({ children }) => (
  <div style={labelContainerStyle}>
    <label style={labelTextStyle}>{children}</label>
  </div>
);