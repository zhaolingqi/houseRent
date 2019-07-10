// pages/owner/autho/autho.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 1,
    scrollLeft: 0,
    levelRange:['Vip','Close','Normal'],
    statusRange:['已授权','未授权'],
    user:[
    ],
    userDetail:null
  },
  //Integer housed
//   Integer userId
// String power

  save() {
    var power = this.data.userDetail.level
    var houseid = this.data.userDetail.houseId
    var userid = this.data.userDetail.userId
    var that = this
    wx.request({
      method:'POST',
      url: 'http://www.changwujuexi.cn:8080/rent?houseid=' + houseid + '&userid=' + userid + '&power=' + power,
      success(res) {
        if (res.data === 200) {
          wx.showToast({
            title: '成功接收申请',
          })
          that.hideModal()       
        } else if (res.data === 401) {
          wx.showToast({
            title: '该房已被出租，无法操作',
            icon:'none'
          })
          that.hideModal()   
        }
        console.log(res)
      }
    })
  },
  submit() {

  },
  // 修改授权状态
  statusChange(e) {
    this.setData({
      'userDetail.status': e.detail.value
    })
  },
  // 修改申请人权限等级
  levelChange(e) {
    console.log(e)
    this.setData({
      'userDetail.level': e.detail.value
    })
    console.log(this.data.userDetail)
  },
  // 修改申请人申请使用起始时间
  startTimeChange(e) {
    console.log(e.detail.value)
    this.setData({
      'userDetail.startTime': e.detail.value
    })
  },
// 修改申请人申请使用截止时间
  endTimeChange(e) {
    this.setData({
      'userDetail.endTime': e.detail.value
    })
  },
// 显示抽屉
  showModal(e) {
    // this.tabSelect(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
      userDetail: this.data.user[e.currentTarget.dataset.index]
    })
  },
  // 隐藏抽屉
  hideModal(e) {
    this.setData({
      modalName: null
    })
    this.getInfo()
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
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
        if(res.statusCode === 200) {
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