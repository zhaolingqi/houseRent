// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:''
  },

  login(e) {
    console.log(e)
    console.log(e.detail.value.username + ' ' + e.detail.value.password)

    wx.request({
      url: 'http://www.changwujuexi.cn:8080/users/log?username=' + e.detail.value.username + '&password=' + e.detail.value.password,
      // url: 'http://169.254.225.23:8080/users/log?username=' + e.detail.value.username + '&password=' + e.detail.value.password,
      method: 'POST',
      data: {
      },
      success(res) {
        console.log(res)
        if(res.data !== '') {
          var temp = res.data.split(',')
          wx.setStorage({
            key: 'Authorization',
            data: temp[0],
          })
          wx.setStorage({
            key: 'Identity',
            data: temp[1],
          })
          wx.showToast({
            title: '已成功登录',
          })
          if(temp[1] === '1') {
            wx.navigateTo({
              url: '../owner/owner',
            })
          } else {
            wx.navigateTo({
              url: '../user/user',
            })
          }
        } else {
          wx.showToast({
            title: '登陆失败，请检查账号密码',
            icon:'none'
          })
        }
      },
      fail(res) {
        console.log(res)
      }
    })

    this.setData({
      name: '',
      password: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ownerId = wx.getStorageSync('Authorization')
    var identity = wx.getStorageSync('Identity')
    console.log('identity')
    console.log(identity)
    if (ownerId !== '') {
      if (identity === '0') {
        wx.navigateTo({
          url: '../user/user',
        })
      } else {
        wx.navigateTo({
          url: '../owner/owner',
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})