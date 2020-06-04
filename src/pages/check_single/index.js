import React, { useState }from 'react';
import {
  Input,
  Button,
  Popover,
  message,
} from 'antd'
import { checkSingle, testIfChecked } from '../../utils/check_single'

import './index.scss';

const Store = window.require('electron-store')

export default () => {
  const [key, setKey] = useState()
  const store = new Store();

  const clickCheck = () => {
    let res = checkSingle(key)
    if (res.status) {
      message.success('密钥存在，消耗成功', 1.5)
    } else {
      switch (res.code) {
        case 1 : message.warning('密钥已验证过', 1.5) 
          break
        case 2 : message.error('密钥不存在', 1.5)
          break
        default : console.log(res)
      }
    }
  }

  const clickTest = () => {
    let freshKey = store.get('freshKey')
    let exist = freshKey.indexOf(key)
    if (exist !== -1) {
      message.success('密钥存在，未被验证', 1.5)
    } else {
      if (testIfChecked(key)) {
        return message.warning('密钥已验证过', 1.5)
      }
      message.error('密钥不存在', 1.5)
    }
  }
  

  return (
    <div className="checksingle">
      <div className="checksingle-content">
        <Input placeholder="输入单个密钥" onChange={e => setKey(e.target.value)} />
        <div className="checksingle-content-buttonbox">
          <Popover content={'会消耗密钥'} placement="bottom" title="密钥验证">
            <Button onClick={() => clickCheck()} danger>验证</Button>
          </Popover>
          <Popover content={'不消耗密钥'} placement="bottom" title="密钥检测">
            <Button onClick={() => clickTest()}>检测</Button>
          </Popover>
        </div>
      </div>
    </div>
  );
}

