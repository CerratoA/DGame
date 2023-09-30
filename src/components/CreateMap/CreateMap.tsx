import { useState } from 'react';
import { Row, Col, Form, Input, Upload, Button, Space } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { StepsProgress, CreateMapStatus } from './StepsProgress';

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
  const [status, setStatus] = useState(CreateMapStatus.EDIT);
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();

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
    // TODO: call API to create map
    setStatus(CreateMapStatus.CREATED);
  }

  const handlePublishMap = () => {
    const values = form.getFieldsValue();
    console.log('values', values);
    // TODO: call API to publish map
    setStatus(CreateMapStatus.PUBLISHED);
  }

  return (
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
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          
          <Form.Item label="JSON File" name="jsonFile">
            <Upload customRequest={handleFileChange}>
              <Button icon={<UploadOutlined />}>Upload JSON</Button>
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
                    <MinusCircleOutlined style={{color:'white'}} onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Attribute
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item >
            <Button type="primary" block style={ContinueButtonStyle}>Create</Button>
            <Button block>Delete</Button>
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
  );
};
