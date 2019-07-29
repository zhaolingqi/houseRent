// pages/user/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelRange: ['Vip', 'Close', 'Normal'],
  },
  // 申请
  apply() {
    var userid = wx.getStorageSync('Authorization')
    var houseid = this.data.houseDetail.id
    var that = this
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/apply?houseid=' + houseid +'&userid=' + userid,
      method:'POST',
      success(res) {
        if(res.data === 200) {
          console.log(res)
          wx.showToast({
            title: '已成功申请',
          })
          that.hideModal()
        } else if (res.data === 401) {
          wx.showToast({
            title: '请勿重复申请',
            icon: 'none'
          })
        }
      }
    })
  },

  showModal(e) {
    // this.tabSelect(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
      houseDetail: this.data.house[e.currentTarget.dataset.index]
    })
    console.log(this.data.houseDetail)
  },
  // 隐藏抽屉
  hideModal(e) {
    this.setData({
      modalName: null
    })
    this.onLoad()
  },
  /**
   * 获得所有可申请房屋信息
   */
  getEnabledHouseInfo() {
    var that = this
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/avahouses',
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          that.dataProcess(res.data)
        }
      }
    })
  },

  /**
 * 获得所有已经申请房屋信息
 */
  getAppliedHouseInfo() {
    var that = this
    var id = wx.getStorageSync('Authorization')
    var appliedHouse = []
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/users/subletapply?id=' + id,
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          appliedHouse = res.data
          that.setData({
            appliedHouse: appliedHouse
          })
          console.log(that.data.appliedHouse)
        }
      }
    })
  },


  /**
 * 对得到的房屋信息进行处理
 */
  dataProcess(houseInfo) {
    console.log(houseInfo)
    var house = []
    var tempHouseDetail = {
      houseRegion: '',
      id: '',
      lockInfo: []
    }
    var tempLockInfo = {
      lockName: '',
      lockLevel: ''
    }
    var tempKeyNumber
    var tempKeyName
    houseInfo.forEach(function (currentItem, index) {
      tempHouseDetail.id = currentItem.id
      if (currentItem.addr !== null) {
        tempHouseDetail.houseRegion = currentItem.addr
        tempKeyNumber = currentItem.keyNumber.split(',')
        tempKeyName = currentItem.keyName.split(',')
        for (let i = 0; i < tempKeyNumber.length; i++) {
          tempLockInfo.lockName = tempKeyName[i]
          tempLockInfo.lockLevel = tempKeyNumber[i]
          console.log(typeof (tempLockInfo))
          tempHouseDetail.lockInfo[i] = Object.assign({}, tempLockInfo)
        }
      } else {
        tempHouseDetail.houseRegion = '没有填写房屋地址'
      }
      house[index] = tempHouseDetail
      tempHouseDetail = {
        houseRegion: '',
        id: '',
        lockInfo: []
      }
    })
    console.log(house)
    this.setData({
      house: house
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEnabledHouseInfo()
    this.getAppliedHouseInfo()
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