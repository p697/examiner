import {
  message
} from 'antd'
const fs = window.require('fs')
const { dialog } = window.require('electron').remote

export default (filename, data) => {
  let filters = [
    {
      name: filename,
      extensions: ['csv']
    }
  ]
  let filePath = dialog.showSaveDialog({
    filters,
    defaultPath: filename,
    title: '导出',
    buttonLabel: '导出'
  })
  filePath.then(res => res.filePath)
    .then(filePath => {
      try {
        fs.writeFileSync(filePath, data)
        message.success('导出成功', 1)
      } catch (error) {
        message.error('导出失败', 1)
      }
    })
}