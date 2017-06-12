function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function showShareMenu(){
  if (wx.showShareMenu){
    wx.showShareMenu({
      withShareTicket: true
    })
  }  
}
function setClipboardData(content){
  if (wx.setClipboardData) {
    wx.setClipboardData({
      data: content,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '您的微信版本太低，不支持复制功能',
      confirmText: '我知道了',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
}
function sayHello(name){
  console.log('Hello '+name);
}
module.exports = {
  formatTime: formatTime,
  sayHello: sayHello,
  showShareMenu: showShareMenu,
  setClipboardData: setClipboardData
}
