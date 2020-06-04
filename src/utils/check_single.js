
const Store = window.require('electron-store')
const store = new Store();

const checkSingle = (keyObj) => {
  let { key, name, submitTime, sysId } = keyObj
  let freshKey = store.get('freshKey')
  let exist = freshKey.indexOf(key)
  if (exist !== -1) {
    freshKey.splice(exist, 1)
    store.set('freshKey', freshKey)  // 先删除freshKey数组里的
    let finishKey = store.get('finishKey')
    if (finishKey) {
      store.set('finishKey', finishKey.concat({
        key: key,
        checkTime: (new Date()).getTime(),
        name: name,
        submitTime: submitTime,
        sysId: sysId
      }))  // 再更新finishKey数组
    } else {
      store.set('finishKey', [{
        key: key,
        checkTime: (new Date()).getTime()
      }])
    }
    // message.success('密钥存在，消耗成功', 1.5)
    console.log('验证成功: ' + key)
    return { status: true, code: 0 }
  } else {
    if (testIfChecked(key)) {
      return { status: false, code: 1 }
    }
    // message.error('密钥不存在', 1.5)
    console.log('验证失败(密钥不存在): ' + key)
    return { status: false, code: 2 }
  }
}

const testIfChecked = (key) => {
  let finishKey = store.get('finishKey')  
  if (finishKey.filter(KeyObj => {
    return key === KeyObj.key
  }).length > 0) {
    // message.warning('密钥已完成验证', 1.5)
    console.log('验证/检测失败(密钥已验证过): ' + key)
    return true
  } else {
    return false
  }
}






export {
  checkSingle,
  testIfChecked
}
