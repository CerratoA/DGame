import { useEffect, useState } from 'react';
import { Row, Col, Form, Upload, Space } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { StepsProgress, CreateMapStatus } from './StepsProgress';
import { Dialog } from '../Dialog/Dialog';
import { useUIStore } from '../../stores/ui';
import { MAP_PRICES, Networks } from '../../constants/crypto';
import { Button } from '../Button/Button';
import { Button as AntButton } from 'antd';
import { Input } from '../Input/Input';
import { Label } from '../Label/Item';
import { Select } from '../Select/Select';

const FormInputStyles: React.CSSProperties = {
  borderRadius: '10.92px',
  border: '0.73px #FF00FF solid',
  backgroundColor: '#000000',
  color: '#FFFFFF',
};

const ContinueButtonStyle = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, rgba(255, 0, 255, 0.40) 23%, rgba(41, 157, 255, 0.40) 100%)',
  borderRadius: '10.92px',
  border: '0.83px #FF00FF solid',
  marginBottom: '10px',
};

export const CreateMap = () => {
  const { isDialogOpen, closeDialog, openDialog } = useUIStore()
  const [status, setStatus] = useState(CreateMapStatus.EDIT);
  const [imagePreview, setImagePreview] = useState(null);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [form] = Form.useForm();

  const realms = Object.values(Networks);
  const [selectedRealm, setSelectedRealm] = useState<string | number>(realms[0]);
  const [price, setPrice] = useState(MAP_PRICES[selectedRealm]);

  useEffect(() => {
    setPrice(MAP_PRICES[selectedRealm]);
  }, [selectedRealm]);

  const handleFileChange = (info) => {
    const file = info.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
  };

  const handleCreateMap = () => {
    const values = form.getFieldsValue();
    console.log('values', values);
    // TODO: call API to create map in DB
    setStatus(CreateMapStatus.CREATED);
  }

  const handlePublishMap = () => {
    const values = form.getFieldsValue();
    console.log('values', values);

    openDialog(true);
    // setStatus(CreateMapStatus.PUBLISHED);
  }

  const execPublishMap = () => {
    const values = form.getFieldsValue();
    // TODO: call API to publish map
    console.log('values', values);
    console.log('realm', selectedRealm);
  }

  const handleDeleteMap = () => {
    const values = form.getFieldsValue();
    console.log('values', values);
  }

  const dialogDescription = `Are you sure you want to publish ${form.getFieldValue('name')} map?`;

  return (
    <>
      <Row style={{ padding: '50px 70px' }} gutter={16}>
        <Col style={{ paddingRight: 40, borderRight: '2px #959595 solid' }} span={10}>
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item label="Name" name="name">
              <Input style={FormInputStyles} placeholder="Enter map name" />
            </Form.Item>

            <Form.Item label="Image" name="image">
              <Upload customRequest={handleFileChange}>
                <AntButton icon={<UploadOutlined />}>Upload Image</AntButton>
              </Upload>
            </Form.Item>

            <Form.Item label="JSON File" name="jsonFile">
              <Upload customRequest={handleFileChange}>
                <AntButton icon={<UploadOutlined />}>Upload JSON</AntButton>
              </Upload>
            </Form.Item>
            <Form.List name="attributes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'attribute']}
                        rules={[{ required: true, message: 'Missing attribute' }]}
                      >
                        <Input style={FormInputStyles} placeholder="Attribute" />
                      </Form.Item>
                      <MinusCircleOutlined style={{ color: 'white' }} onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <AntButton type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Attribute
                    </AntButton>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item >
              {status === CreateMapStatus.EDIT &&
                <Button onClick={handleCreateMap} block style={ContinueButtonStyle}>Create</Button>
              }
              {status === CreateMapStatus.CREATED &&
                <Button onClick={handlePublishMap} block style={ContinueButtonStyle}>Publish</Button>
              }
              {status === CreateMapStatus.CREATED &&
                <Button block warning onClick={handleDeleteMap}>Delete</Button>
              }
            </Form.Item>
          </Form>
        </Col>
        <Col style={{ paddingLeft: 40 }} span={14}>
          <StepsProgress status={status} />

          {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '100%', margin: '10px 0' }} />}
          <div>Name: {form.getFieldValue('name')}</div>
          <div>
            <h4>Attributes:</h4>
            <ul>
              {form.getFieldValue('attributes')?.map((attrObj, index) => (
                <li key={index}>{attrObj.attribute}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
      {/* <ConfirmationDialog open={openPublishDialog} onClose={() => setOpenPublishDialog(false)} onConfirm={execPublishMap} /> */}
      <Dialog title='CONFIRMATION' description={dialogDescription} open={isDialogOpen} onClose={closeDialog} onConfirm={execPublishMap}>
        <Label>Price</Label>
        <Input value={price} disabled />

        <Label>Realm</Label>
        <Select value={selectedRealm} onChange={setSelectedRealm} options={realms.map((realm) => ({ value: realm, label: realm }))} />
      </Dialog>
    </>
  );
};
