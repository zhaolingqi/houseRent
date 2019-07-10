// pages/owner/owner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toMyInfo() {
    wx.navigateTo({
      url: 'myInfo/myInfo',
    })
  },

  toAuthorization() {
    wx.navigateTo({
      url: 'autho/autho',
    })
  },
  toHouse() {
    wx.navigateTo({
      url: 'house/house',
    })
  },
  toApply() {
    wx.navigateTo({
      url: 'apply/apply',
    })
  },
  toScan() {
    wx.navigateTo({
      url: 'scan/scan',
    })
  },
  logout() {
    wx.removeStorageSync('Authorization')
    wx.removeStorageSync('Identity')
    console.log(wx.getStorageSync('Authorization'))
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var ownerId = wx.getStorage({
    //   key: 'Authorization',
    //   success: function(res) {},
    // })
    // console.log(ownerId)
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/users/list',
      success(res) {
        console.log(res)
      }
    })
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