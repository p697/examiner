import React, { useState } from 'react';
import {
  InputNumber,
  Button,
  Divider,
  Tag,
  Table,
  Tooltip,
  message
} from 'antd';
import otpExcel from '../../utils/otpexcel'
import clickKey from '../../utils/clickkey'

import './index.scss';

const uuid = require('node-uuid')
const md5 = require('md5-node')
const Store = window.require('electron-store')

export default () => {
  const [number, setNumber] = useState(1)
  const [keyArray, setKeyArray] = useState([])

  const columns = [
    {
      dataIndex: 'number',
      key: 'number',
    },
    {
      dataIndex: 'key',
      key: 'key',
      render: text => <Tooltip title="复制">
        <Tag color="blue" key={text} style={{ cursor: "pointer" }} onClick={e => clickKey(text)}>
          {text}
        </Tag></Tooltip>,
    },
  ]

  const generateKey = () => {
    let keys = []
    for (let i = 0; i < number; i++) {
      let creatuuid = uuid.v1().split('-') + 'sp697'
      let creatmd5 = md5(creatuuid)
      keys.push(creatmd5)
    }
    // 本地数据存储操作
    const store = new Store();
    // store.delete('freshKey')
    let existFreshKey = store.get('freshKey')
    if (existFreshKey) {
      store.set('freshKey', existFreshKey.concat(keys))
    } else {
      store.set('freshKey', keys)
    }
    setKeyArray(keys.map((key, index) => {
      return {
        number: index + 1,
        key: key
      }
    }))
  }

  const outputKey = () => {
    if (keyArray.length < 1) return message.error('还没有生成密钥')
    let data = ''
    keyArray.map((keyObj) => {
      return keyObj.key + '\n'
    }).forEach(key => data += key)
    otpExcel('新生成密钥', data)
  }


  return (
    <div className="keycreate">
      <div className="keycreate-content">
        <div className="keycreate-content-left">
          <div className="keycreate-content-left-number">
            <div className="keycreate-content-left-number-lable">生成数量：</div>
            <InputNumber min={1} max={1000} defaultValue={1} onChange={e => setNumber(e)} />
          </div>
          <Button className="keycreate-content-left-button" type="primary" onClick={e => generateKey()}>确认生成</Button>
          <Button className="keycreate-content-left-button" onClick={e => outputKey()}>导出Excel</Button>
        </div>
        <div className="keycreate-content-right">
          <Divider orientation="left">生成列表</Divider>
          <Table showHeader={false} columns={columns} dataSource={keyArray} size="small" />
        </div>
      </div>
    </div>
  );
}

