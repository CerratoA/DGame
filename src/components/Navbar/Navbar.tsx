import { Col, Image, Row, Menu, MenuProps } from "antd";
import logo from "../../assets/images/logo.png";
import { FilterMaps, useUIStore } from "../../stores/ui";
import { Button } from "../Button/Button";
import { useEffect, useState } from "react";


const items: MenuProps['items'] = [
  {
    label: 'ALL',
    key: 'all',
  }
];

export const Navbar = () => {
  const { filterMyMaps, changeFilterMyMaps, isWalletConnected, setWalletConnected } = useUIStore();
  const [items, setItems] = useState<MenuProps['items']>([]); // [] is the initial value
  

  useEffect(() => {
    if(isWalletConnected) {
      console.log('Wallet connected');
      setItems([
        {
          label: 'ALL',
          key: 'all',
        },
        {
          label: 'MINE',
          key: 'mine',
        }
      ]);
    } else {
      setItems([
        {
          label: 'ALL',
          key: 'all',
        }
      ]);      
    }
    console.log(`items: ${JSON.stringify(items)}`);
  }, [isWalletConnected]);
  
  const handleFilterMyMaps = (info: { key: string }) => {
    changeFilterMyMaps(info.key as FilterMaps);
  }

  const toggleConnect = () => {
    setWalletConnected(!isWalletConnected);
  }

  const buttonText = isWalletConnected ? 'Disconnect' : 'Connect';

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
              <Button onClick={toggleConnect}>{buttonText}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}