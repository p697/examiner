import React, { useState } from 'react';
import {
  Table,
  Tag,
  Button,
  Popover,
  Radio,
  message,
  Modal,
} from 'antd';
import otpExcel from '../../../utils/otpexcel'
import clickKey from '../../../utils/clickkey'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const Store = window.require('electron-store')

export default () => {
  const store = new Store();
  const [otpType, setOtpType] = useState('some')
  const [selectedKey, setSelectedKey] = useState([])
  const [freshKey, setFreshKey] = useState(store.get('freshKey').map((key, index) => {
    return {
      number: index + 1,
      key: key
    }
  }))
  const columns = [
    {
      title: '序号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '密钥',
      dataIndex: 'key',
      key: 'key',
      render: text =>
        <Tag color="blue" key={text} style={{ cursor: "pointer" }} onClick={e => clickKey(text)}>
          {text}
        </Tag>,
    },
  ]
  const outputPop = (
    <div>
      <Radio.Group onChange={e => setOtpType(e.target.value)} value={otpType}>
        <Radio value={'some'}>导出选中</Radio>
        <Radio value={'all'}>全部导出</Radio>
      </Radio.Group>
      <Button onClick={() => output()}>确认导出</Button>
    </div>
  )

  const output = () => {
    if (otpType === 'some') {
      if (selectedKey.length < 1) return message.error('未选择', 1.5)
      let data = ''
      selectedKey.map((key) => {
        return key + '\n'
      }).forEach(key => data += key)
      // 导出excel
      otpExcel('未验证密钥(选中)', data)
    } else if (otpType === 'all') {
      let data = ''
      store.get('freshKey').map((key) => {
        return key + '\n'
      }).forEach(key => data += key)
      // 导出excel
      otpExcel('未验证密钥(全部)', data)
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '删除之后无法复原！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => handleDelete()
    })
  }

  const handleDelete = () => {
    const newFreshKey = store.get('freshKey').filter(key => {
      return selectedKey.indexOf(key) === -1
    })
    store.set('freshKey', newFreshKey)
    setFreshKey(newFreshKey.map((key, index) => {
      return {
        number: index + 1,
        key: key
      }
    }))
    message.success(`删除成功`, 1.5)
  }

  return (
    <div>
      <Table columns={columns} dataSource={freshKey} size="small" rowSelection={{
        selectedKey,
        onChange: e => setSelectedKey(e)
      }} />
      <div className="checkdone-output">
        <Popover content={outputPop} title="导出Excel" trigger="click" placement="bottomRight">
          <Button size="small">导出Excel</Button>
        </Popover>
        <Button className="checkdone-output-button" size="small" onClick={() => confirmDelete()} danger>删除</Button>
      </div>
    </div>
  );
}

