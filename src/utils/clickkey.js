import {
  message
} from 'antd'

const clickKey = (key) => {
  let transfer = document.createElement('input');
  document.body.appendChild(transfer);
  transfer.value = key;  // 这里表示想要复制的内容
  transfer.focus();
  transfer.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  transfer.blur();
  console.log('复制成功');
  document.body.removeChild(transfer);
  message.success('复制成功', 0.5)
}

export default clickKey