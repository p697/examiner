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
import { ExclamationCircleOutlined } from '@ant-design/icons'
import otpExcel from '../../../utils/otpexcel'
import { time_to_timestap, timestap_to_time } from '../../../utils/timestap_time'
import formatFinishKey from '../../../utils/format_finishKey'
import clickKey from '../../../utils/clickkey'
const Store = window.require('electron-store')

export default () => {
  const store = new Store();
  const [otpType, setOtpType] = useState('some')
  const [selectedKey, setSelectedKey] = useState([])
  const [finishKey, setFinishKey] = useState(formatFinishKey(store.get('finishKey')))

  const columns = [
    {
      title: '序号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '验证时间',
      dataIndex: 'checkTime',
      key: 'checkTime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => time_to_timestap(a.checkTime) - time_to_timestap(b.checkTime),
    },
    {
      title: '密钥',
      dataIndex: 'key',
      key: 'key',
      render: text =>
        <Tag color="gold" key={text} style={{ cursor: "pointer" }} onClick={e => clickKey(text)}>
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
    let data = '\uFEFF姓名,系统id,提交时间,验证时间,密钥\n'

    if (otpType === 'some') {
      if (selectedKey.length < 1) return message.error('未选择', 1.5)
      selectedKey.map((key) => {
        let keyObj = finishKey.filter(ko => {
          return ko.key === key
        })[0]
        console.log(keyObj)
        return keyObj.name + ',' + keyObj.sysId + ',' + keyObj.submitTime + ',' + keyObj.checkTime + ',' + keyObj.key + '\n'
      }).forEach(row => data += row)
      // 导出excel
      otpExcel('已验证密钥(选中)', data)
    } else if (otpType === 'all') {
      store.get('finishKey').reverse().map((keyObj) => {
        return keyObj.name + ',' + keyObj.sysId + ',' + keyObj.submitTime + ',' + timestap_to_time(keyObj.checkTime, 'Y-m-d H:i:s') + ',' + keyObj.key + '\n'
      }).forEach(row => data += row)
      // 导出excel
      otpExcel('已验证密钥(全部)', data)
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
    const newFinishKey = store.get('finishKey').filter(keyObj => {
      return selectedKey.indexOf(keyObj.key) === -1
    })
    store.set('finishKey', newFinishKey)
    setFinishKey(formatFinishKey(newFinishKey))
    message.success(`删除成功`, 1.5)
  }


  return (
    <div>
      <Table columns={columns} dataSource={finishKey} size="small"
        rowSelection={{
          selectedKey,
          onChange: e => setSelectedKey(e)
        }}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
        }}
      />
      <div className="checkdone-output">
        <Popover content={outputPop} title="导出Excel" trigger="click" placement="bottomRight">
          <Button size="small">导出Excel</Button>
        </Popover>
        <Button className="checkdone-output-button" size="small" onClick={() => confirmDelete()} danger>删除</Button>
      </div>
    </div>
  );
}

