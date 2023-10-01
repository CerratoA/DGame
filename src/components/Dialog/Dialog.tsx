import React from 'react';
import { Modal } from 'antd';
import { Button } from '../Button/Button';

interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  title: string;
  description: string;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 50
};

const headerStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '24px',
  fontFamily: 'Bai Jamjuree, sans-serif',
  fontWeight: 500,
  lineHeight: '24.68px',
};

const paragraphStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '16.83px',
  fontFamily: 'Bai Jamjuree, sans-serif',
  fontWeight: 400,
  textTransform: 'uppercase',
  lineHeight: '24.68px',
}

export const Dialog: React.FC<BaseDialogProps> = ({
  open,
  onClose,
  onConfirm,
  children,
  title,
  description,
}) => {

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
    >
      <div style={containerStyle}>
        <div style={headerStyle}>{title}</div>

        <p style={paragraphStyle}>
          {description}
        </p>
        {children}

        <div style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
          <Button block onClick={onConfirm} >
            Confirm
          </Button>
          <Button block secondary onClick={onClose} style={{ marginRight: '0.5rem' }}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
