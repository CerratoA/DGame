import { Button as AntButton } from 'antd';

type ButtonStyles = {
  color?: string;
  background?: string;
  borderRadius?: string;
  border?: string;
  marginBottom?: string;
  fontWeight?: number;
  fontSize?: string;
}

const defaultStyles: ButtonStyles = {
  color: 'white',
  background: 'linear-gradient(90deg, rgba(255, 0, 255, 0.40) 23%, rgba(41, 157, 255, 0.40) 100%)',
  borderRadius: '10.92px',
  border: '0.83px #FF00FF solid',
  marginBottom: '10px',
};

const secondaryStyles: ButtonStyles = {
  color: 'white',
  borderRadius: '15px',
  border: '1.14px solid #FF00FF',
  background: 'linear-gradient(180deg, #03000A 0%, #0A0020 66%)'
};

const warningStyles: ButtonStyles = {
  color: 'red',
  fontWeight: 500,
  fontSize: '16px',
  background: 'transparent',
  border: 'none',
};

type ButtonProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
  block?: boolean;
  secondary?: boolean;
  warning?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ style = {}, children, onClick, block = false, secondary = false, warning = false }) => {
  let baseStyle: ButtonStyles = defaultStyles;
  if (secondary) {
    baseStyle = secondaryStyles;
  } else if (warning) {
    baseStyle = warningStyles;
  }

  let mergedStyles: React.CSSProperties = { ...baseStyle, ...style };

  return (
    <AntButton block={block} style={mergedStyles} onClick={onClick}>
      {children}
    </AntButton>
  );
};
