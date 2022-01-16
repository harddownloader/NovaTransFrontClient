import React from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import "./nprogress.module.css";

import { Layout, Menu } from "antd";

const { Header } = Layout;


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Nav = () => (
  <nav>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">
          <Link href="/">
            <a>Главная</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/about">
            <a>О Нас</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  </nav>
);

export default Nav;
