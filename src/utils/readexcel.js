import {
  message
} from 'antd'
const fs = window.require('fs')
const { dialog } = window.require('electron').remote
const xlsx = require('node-xlsx');

export default (filename, data) => {
  let filters = [
  ]
  let filePath = dialog.showSaveDialog({
    filters,
    defaultPath: filename,
    title: '选择文件',
    buttonLabel: '选择文件'
  })
  filePath.then(res => res.filePath)
    .then(filePath => {
      try {
        
        message.success('读取成功', 1)
      } catch (error) {
        message.error('读取失败', 1)
      }
    })
}