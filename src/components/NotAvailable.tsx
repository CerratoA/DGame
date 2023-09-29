import { Layout, Typography, Space, Button, Tooltip } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text, Link } = Typography;

export const NotAvailablePage = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        <Space direction="vertical" size="middle">
          <Text strong style={{ fontSize: 24 }}>This size is not supported yet,</Text>
          <Link href="https://www.yourwebsite.com/learn-more">learn more here</Link>
          
          <Space size="middle">
            <Tooltip title="Facebook">
              <Button shape="circle" icon={<FacebookOutlined />} href="https://www.facebook.com/yourpage" />
            </Tooltip>
            <Tooltip title="Twitter">
              <Button shape="circle" icon={<TwitterOutlined />} href="https://www.twitter.com/yourpage" />
            </Tooltip>
            <Tooltip title="Instagram">
              <Button shape="circle" icon={<InstagramOutlined />} href="https://www.instagram.com/yourpage" />
            </Tooltip>
          </Space>
        </Space>

      </Content>
    </Layout>
  );
}
