import { Col, Image, Row } from "antd";
import logo from "../../assets/images/logo.png";

export const Navbar = () => {
  return (
    <>
      <Row align="middle" style={{height: '100%'}}>
        <Col span={6}>
          <Image width={160} src={logo} />
        </Col>
        <Col span={6}>Home</Col>
        <Col span={6} offset={6}>Connect Wallet</Col>
      </Row>
    </>
  );
}