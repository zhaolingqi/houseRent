// pages/owner/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelRange: ['Vip', 'Close', 'Normal'],
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
        if(res.statusCode === 200) {
          that.dataProcess(res.data)
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