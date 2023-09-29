import { Col, Row } from "antd"
import { Banner } from "./Banner/Banner"

export const ContentBox = () => {
  return (
    <Row >
      <Col span={24}>
        <Banner />
        <Row>Content</Row>
      </Col>
    </Row>
  )
}