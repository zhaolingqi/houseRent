// pages/user/autho/autho.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  save() {
    var that = this
    var houseid = this.data.userDetail.houseId
    var userid = this.data.userDetail.userId
    wx.request({
      method:'POST',
      url: 'http://www.changwujuexi.cn:8080/sublet?houseid=' + houseid + '&userid=' + userid,
      success(res) {
        if(res.data === 401) {
          wx.showToast({
            title: '若经转租降低一级权限后，将没有可开的锁，无法接受申请',
            icon: 'none'
          })
          that.hideModal()
        } else if (res.data === 200){
          that.hideModal()
        }
        console.log('sublet',res)
      }
    })
  },
  // 显示抽屉
  showModal(e) {
    // this.tabSelect(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
      userDetail: this.data.user[e.currentTarget.dataset.index]
    })
    console.log(this.data.userDetail)
  },
  // 隐藏抽屉
  hideModal(e) {
    this.setData({
      modalName: null
    })
    this.getInfo()
  },

  getInfo() {
    var that = this
    var id = wx.getStorageSync('Authorization')
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/users/apply?id=' + id,
      success(res) {
        if (res.statusCode === 200) {
          that.setData({
            user: res.data
          })
        }
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = wx.getStorageSync('Authorization')
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/users/apply?id=' + id,
      success(res) {
        if (res.statusCode === 200) {
          that.setData({
            user: res.data
          })
        }
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