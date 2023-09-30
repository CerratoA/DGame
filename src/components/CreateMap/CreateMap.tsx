import { useState } from 'react';
import { Row, Col, Form, Input, Upload, Button, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const CreateMap = () => {
  const [status, setStatus] = useState('editing');
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    attributes: [],
    // ... Add other fields as needed
  });

  const handleFileChange = (info) => {
    const file = info.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
  };

  return (
    <Row style={{padding:50}} gutter={16}>
      <Col span={12}>
        <Form>
          <Form.Item label="Name">
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Image File">
            <Upload beforeUpload={() => false} onChange={handleFileChange}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="JSON File">
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          {/* Add form items for attributes list */}
          <Form.Item>
            <Button type="primary">Create</Button>
            <Button style={{ marginLeft: '10px' }}>Delete</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <div>
          <span>1 Editing</span>
          <span> --- </span>
          <span>2 Created</span>
          <span> --- </span>
          <span>3 Published</span>
        </div>
        {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '100%', margin: '10px 0' }} />}
        <div>Name: {formData.name}</div>
        <List
          header={<div>Attributes</div>}
          bordered
          dataSource={formData.attributes}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Col>
    </Row>
  );
};
