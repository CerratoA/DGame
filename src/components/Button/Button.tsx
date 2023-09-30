import { Button as AntButton } from 'antd';

const defaultStyles = {
  backgroundColor: 'blue', // Default color, for demonstration. Adjust as needed.
  color: 'white',
};

export const Button = ({ style = {}, children, onClick }) => {
  // Merge default styles with provided styles
  const mergedStyles = { ...defaultStyles, ...style };

  return (
    <AntButton style={mergedStyles} onClick={onClick}>
      {children}
    </AntButton>
  );
};
