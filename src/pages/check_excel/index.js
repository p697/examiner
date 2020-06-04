import React, { useState } from 'react';
import {
  message,
  Table,
  Tag,
  Tooltip
} from 'antd'
import { useDropzone } from 'react-dropzone'
import { UploadOutlined } from '@ant-design/icons';
import { checkSingle } from '../../utils/check_single'
import clickKey from '../../utils/clickkey'

import './index.scss';

const { dialog } = window.require('electron').remote
const xlsx = window.require('node-xlsx');

export default () => {
  const [checkResult, setCheckResult] = useState([])
  const columns = [
    {
      title: '',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '密钥',
      dataIndex: 'key',
      key: 'key',
      render: keyCode => {
        let color, text
        switch (keyCode[0]) {
          case 1: color = 'gold'; text = '密钥已验证过'
            break
          case 2: color = 'red'; text = '密钥不存在'
            break
          default: color = 'green'; text = '验证成功'
        }
        return (
          <Tooltip title={text}>
            <Tag color={color} key={keyCode[1]} style={{ cursor: "pointer" }} onClick={e => clickKey(keyCode[1])}>
              {keyCode[1]}
            </Tag>
          </Tooltip>

        )
      },
    },
  ]

  const clickUpload = () => {
    let filters = [
      { name: 'Excel', extensions: ['xlsx', 'csv', 'xlsm', 'xls', 'xlsb', 'xlsx', 'xml'] },
      { name: 'All Files', extensions: ['*'] }
    ]
    let filePath = dialog.showOpenDialog({
      filters,
      defaultPath: '',
      title: '选择文件',
    })
    filePath.then(res => res.filePaths[0])
      .then(filePath => {
        try {
          // 这里是处理读取的excel的逻辑
          let sheets = xlsx.parse(filePath)
          message.success('读取成功', 1)
          getEleIndex(sheets[0].data)
        } catch (error) {
          console.log(error)
          message.error('读取失败', 1)
        }
      })
  }

  const getEleIndex = (data) => {
    let keyIndex = 8
    let submitTimeIndex = 1
    let nameIndex = 6
    let sysIdIndex = 7
    data[0].forEach(item => {
      if (item.includes('解黑券码')) {
        keyIndex = data[0].indexOf(item)
      } else if (item.includes('答卷时间')) {
        submitTimeIndex = data[0].indexOf(item)
      } else if (item.includes('姓名')) {
        nameIndex = data[0].indexOf(item)
      } else if (item.includes('系统号')) {
        sysIdIndex = data[0].indexOf(item)
      }
    })
    const eleIndex = {
      keyIndex: keyIndex,
      submitTimeIndex: submitTimeIndex,
      nameIndex: nameIndex,
      sysIdIndex: sysIdIndex,
    }
    return check(data.slice(1), eleIndex)
  }

  const check = (data, eleIndex) => {
    setCheckResult(
      data.map((row, index) => {
        let code = checkSingle(row[eleIndex.keyIndex]).code
        return {
          number: index + 1,
          key: [code, row[eleIndex.keyIndex]],
          name: row[eleIndex.nameIndex],
          status: code,
          description: '系统ID：' + row[eleIndex.sysIdIndex] + ' 、 问卷提交时间：' + row[eleIndex.submitTimeIndex]
        }
      })
    )
  }

  // 实现拖拽上传
  // eslint-disable-next-line
  const onDrop = acceptedFiles => {
    // 以下逻辑和点击上传一样
    let sheets = xlsx.parse(acceptedFiles[0].path)
    message.success('读取成功', 1)
    return getEleIndex(sheets[0].data)
  }
  const { getRootProps } = useDropzone({onDrop})


  return (
    <div className="checkexcel">
      <div className="checkexcel-left">
        <div className="checkexcel-left-drapbox" onClick={() => clickUpload()} >
          <UploadOutlined className="checkexcel-left-drapbox-icon" />
          <div className="checkexcel-left-drapbox-lable" {...getRootProps()}>
            <p>点击此处上传</p>
            <p>或将文件拖拽到这里</p>
          </div>
        </div>
        {/* <Button type="primary" shape="round" size="large" icon={<UploadOutlined />} className="checkexcel-left-button" onClick={() => clickUpload()}>上传Excel</Button> */}
      </div>
      <div className="checkexcel-right">
        <Table columns={columns} dataSource={checkResult} size="small"
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          }}
        />
      </div>
    </div>
  );
}

