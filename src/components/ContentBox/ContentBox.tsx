import { Col, Row } from "antd"
import { Banner } from "../Banner/Banner"
import { MapItem } from "../MapItem/MapItem"
import { useEffect, useState } from "react"
import { useUIStore } from "../../stores/ui";

const exampleImg = 'https://picsum.photos/300/300';

const ExampleMaps = [];

for (let i = 0; i < 30; i++) {
  ExampleMaps.push({
    img: exampleImg,
    title: `Map ${i + 1}`,
    description: `This is map ${i + 1}`,
    isMine: i % 2 === 0,
  });
}

const mapContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  maxHeight: 'calc(100vh - 400px)', // Adjust this value based on your requirements.
  overflowY: 'auto',
};


export const ContentBox = () => {
  const [maps, setMaps] = useState(null);
  const filterMyMaps = useUIStore(state => state.filterMyMaps);

  const renderMaps = () => {
    return ExampleMaps
      .filter(map => {
        if (filterMyMaps === 'mine') {
          return map.isMine;
        }
        return true; // If filterMyMaps is not 'mine', return all maps.
      })
      .map((map, index) => (
        <MapItem map={map} key={index} />
      ));
  }

  useEffect(() => {
    console.log('ContentBox mounted');
    const result = renderMaps();
    setMaps(result);
  }, [filterMyMaps]);

  return (
    <Row style={{ margin: 50 }}>
      <Col span={24}>
        <Banner />
        <Row className="customScrollBar" style={mapContainerStyle} >
          {maps
            ? maps
            : <p>There are no maps to view</p>
          }
        </Row>
      </Col>
    </Row>
  )
}