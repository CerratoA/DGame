import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, Select } from 'antd';
import { MAP_PRICES, Networks } from '../../constants/crypto';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (realm: string) => void;
  mapName: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  mapName,
}) => {
  const realms = Object.values(Networks);
  const [selectedRealm, setSelectedRealm] = useState<string | undefined>(realms[0]);
  const [price, setPrice] = useState(MAP_PRICES[selectedRealm]);

  useEffect(() => {
    setPrice(MAP_PRICES[selectedRealm]);
  }, [selectedRealm]);

  return (
    <Modal
      title={'Confirmation'}
      open={open}
      footer={null}
      onCancel={onClose}
    >
      <p>{`Are you sure you want to publish ${mapName} map?`}</p>

      <label>Price</label>
      <Input value={price} disabled />

      <label>Realm</label>
      <Select
        value={selectedRealm}
        onChange={(value) => setSelectedRealm(value)}
      >
        {realms.map(realm => (
          <Select.Option key={realm} value={realm}>
            {realm}
          </Select.Option>
        ))}
      </Select>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button onClick={onClose} style={{ marginRight: '0.5rem' }}>
          Cancel
        </Button>
        <Button type="primary" onClick={() => onConfirm(selectedRealm!)} >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
