import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { HomeOutlined, FileOutlined, InfoCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import UserContext from "../context/UserContext";
import "./Navbar.css"; 

const { Header } = Layout;

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [setUser]);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    console.log("Logged out");
  };

  return (
    <Header className="header">
      <div className="logo-container">
        {user && (
          <div className="logo">
            Hi {user.first_name}
          </div>
        )}
        {!user && (
          <div className="logo">
            <Link to="/login">Login</Link>
          </div>
        )}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileOutlined />}>
            <Link to="/posts">Posts</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<InfoCircleOutlined />}>
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      </div>
      {user && (
        <Button
          type="primary"
          onClick={handleLogout}
          icon={<LogoutOutlined />}
          className="logout-button"
        >
          Logout
        </Button>
      )}
    </Header>
  );
};

export default Navbar;
