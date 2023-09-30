import { Col, Image, Row, Menu, MenuProps } from "antd";
import logo from "../../assets/images/logo.png";
import { FilterMaps, useUIStore } from "../../stores/ui";

const MenuStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: 'white',
}

export const Navbar = () => {
  const { filterMyMaps, changeFilterMyMaps } = useUIStore();
  const items: MenuProps['items'] = [
    {
      label: 'ALL',
      key: 'all',
    },
    {
      label: 'MINE',
      key: 'mine',
    }
  ];
  
  const handleFilterMyMaps = (info: { key: string }) => {
    changeFilterMyMaps(info.key as FilterMaps);
  }

  return (
    <>
      <Row align="middle" style={{ height: '100%' }}>
        <Col span={12}>
          <Row gutter={16}>
            <Col flex={"180px"}>
              <Image width={160} src={logo} />
            </Col>
            <Col flex={'auto'}>
              <Menu mode="horizontal" onClick={handleFilterMyMaps} selectedKeys={[filterMyMaps]} items={items} />
            </Col>
          </Row>
        </Col>
        <Col span={6} offset={6}>
          <Row justify="end">
            <Col>
              <div>Connect Wallet</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}