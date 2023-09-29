import { Image } from "antd"
import { Text } from "../Text/Text"

const ContainerStyle: React.CSSProperties = {
  margin: '25px 10px',
  textAlign: 'center',
  backgroundColor: 'black',
  padding: 10,
}

const TextContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'flex-start',  // Adjust this from 'center' to 'flex-start'
  width: '100%',
}


export const MapItem = ({ map }) => {
  return (
    <div style={ContainerStyle}>
      <Image width={250} src={map.img} alt={map.title} />
      <div style={TextContainerStyle}>
        <Text>
          {map.title}
        </Text>
      </div>
    </div>
  )
}
