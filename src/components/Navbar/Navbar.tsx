import { Col, Image, Row } from "antd";
import logo from "../../assets/images/logo.png";

export const Navbar = () => {
  return (
    <>
      <Row align="middle" style={{ height: '100%' }}>
        <Col span={12}>
          <Row gutter={16}>
            <Col>
              <Image width={160} src={logo} />
            </Col>
            <Col>
              <div>Home</div>
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