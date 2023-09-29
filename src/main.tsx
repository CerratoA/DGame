import ReactDOM from "react-dom/client";
import "./styles.css";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Navbar } from "./components/Navbar/Navbar";
import { useWindowSize } from "./ui/hooks/useWindowSize";
import { NotAvailablePage } from "./components/NotAvailable";
import { ContentBox } from "./components/ContentBox/ContentBox";

const LayoutStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: 'transparent',
};

const headerStyle: React.CSSProperties = {
  color: '#fff',
  height: 100,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'transparent',
  borderBottom: '1px #851A80 solid'
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'transparent',
};

const footerStyle: React.CSSProperties = {
  color: '#fff',
  backgroundColor: '#130033',
};

export const App = () => {
  const windowSize = useWindowSize();

  // Define the width limit to classify as 'narrow'
  const NARROW_WIDTH = 768; // e.g., for tablets and below

  if (windowSize.width <= NARROW_WIDTH) {
    return <NotAvailablePage />;
  }
  return (
    <div className="main-page-bg">
      <Layout style={LayoutStyle}>
      <Header style={headerStyle}><Navbar /></Header>
      <Content style={contentStyle}><ContentBox /></Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
