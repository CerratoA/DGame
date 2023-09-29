import { Button, Col, Image, Row } from "antd"
import logoColor from "../../../assets/images/logo_color.png"
import { Text } from "../../Text/Text";

const bannerStyle: React.CSSProperties = {
  margin: 50,
  // backgroundColor: 'darkblue',
  background: 'linear-gradient(0deg, #17002C 0%, #17002C 100%)',
  height: 120,
};

export const Banner = () => {
  return (
    <Row align="middle" gutter={50} justify={'center'}>
      <Col span={24}>
        <Row align="middle" style={bannerStyle}>
          <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
            <Image width={90} src={logoColor} />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px'  // optional: for some space between the image and buttons
            }}>
              <Button type="primary" style={{ marginBottom: '5px' }}>@dega_org</Button>
              <Button type="primary">www.dega.org</Button>
            </div>
          </Col>
          <Col span={10}>
            <div style={{ padding: 10 }}>
              <Text>
                🗓️ Mark your calendars for this insightful DEGA Space: "DEGA's Decade Ahead" on Thursday, 31st August at 3pm UTC.
              </Text>
            </div>
          </Col>
          <Col span={8}>
            image
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
