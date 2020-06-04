const timestap_to_time = function (timestamp, formats) {
  if (!timestamp) {
    return 0
  }
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d';

  var zero = function (value) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };

  var myDate = timestamp ? new Date(timestamp) : new Date();

  var year = myDate.getFullYear();
  var month = zero(myDate.getMonth() + 1);
  var day = zero(myDate.getDate());

  var hour = zero(myDate.getHours());
  var minite = zero(myDate.getMinutes());
  var second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
    return ({
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    })[matches];
  });
};

const time_to_timestap = (time) => {
  var myDate = new Date(time)
  // console.log(myDate.getTime())
  return myDate.getTime()
}

export {
  timestap_to_time,
  time_to_timestap
}