import { timestap_to_time } from './timestap_time'

export default (finishKey) => {
  return (
  finishKey.reverse().map((keyObj, index) => {
    let name = keyObj.name ? keyObj.name : ''
    name = name.length < 5 ? name : name.split('').splice(0, 4).join('') + '...'
    return {
      number: index + 1,
      key: keyObj.key,
      name: name,
      checkTime: timestap_to_time(keyObj.checkTime, 'Y-m-d H:i:s'),
      sysId: keyObj.sysId,
      submitTime: keyObj.submitTime,
      description: '系统ID：' + keyObj.sysId + '; 问卷提交时间：' + keyObj.submitTime
    }
  })
  )
}