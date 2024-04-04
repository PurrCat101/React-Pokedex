import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = ({ setActiveMenuItem, activeMenuItem }) => {
  const handleClick = (e) => {
    setActiveMenuItem(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[activeMenuItem]}
      mode="horizontal"
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="game">
        <Link to="/game">Guess that pokemon</Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about">About</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
