import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  ExperimentOutlined,
  FileSearchOutlined,
  RightCircleOutlined,
  LeftCircleOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import './menu.scss'

const { SubMenu } = Menu;

export default () => {
  const [close, setClose] = useState(false)

  const trigger = () => {
    setClose(!close)
  }

  const TriggerIcon = () => {
    if (close) {
      console.log(close)
      return (
        <RightCircleOutlined className="menubox-trigger-bottomicon" />
      )
    }
    else {
      return (
        <LeftCircleOutlined className="menubox-trigger-bottomicon" />
      )
    }
  }

  return (
    <div className="menubox">
      <Menu
        mode="inline"
        inlineCollapsed={close}
        defaultOpenKeys={['sub1']}
        defaultSelectedKeys={['1']}
        style={{ width: close ? 80 : 192 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <FileSearchOutlined />
              <span>密钥验证</span>
            </span>
          }
        >
          <Menu.Item key="1"><Link to="/check_excel">Excel验证</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/check_single">单独验证</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/check_done">验证统计</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="sub2">
          <Link to="/key_create"></Link>
          <span>
            <ExperimentOutlined />
            <span>密钥生成</span>
          </span>
        </Menu.Item>
        <Menu.Item key="sub3">
          <Link to="/help"></Link>
          <span>
            <ReadOutlined />
            <span>使用帮助</span>
          </span>
        </Menu.Item>

      </Menu>
      <div className="menubox-trigger" onClick={() => trigger()}>
        <TriggerIcon />
      </div>
    </div>
  );
}


