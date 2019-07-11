// pages/user/house/house.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelRange: ['Vip', 'Close', 'Normal'],
    rentStatus: ['可被租赁','不可被租赁']
  },
  // 结束租赁
  endRent() {
    var that = this
    var houseid = this.data.houseDetail.id
    wx.request({
      method:'POST',
      url: 'http://www.changwujuexi.cn:8080/endrent?houseid=' + houseid,
      success(res) {
        if(res.data === 200) {
          wx.showToast({
            title: '已结束共享',
            icon: 'none'
          })
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
  },
  // 允许出租
  rentEnabled() {
    var that = this
    wx.request({
      method:'POST',
      url: 'http://www.changwujuexi.cn:8080/allowrent?houseid=' + that.data.houseDetail.id,
      success(res) {
        console.log('rentEnabled',res)
        if(res.data === 200 ) {
          that.hideModal()
        } else if (res.data ===401) {
          wx.showToast({
            title: '您的权限为Normal，无法继续转租',
            icon: 'none'
          })
        }
      }
    })
  },
  //禁止出租
  rentUnenabled() {
    var that = this
    wx.request({
      method: 'POST',
      url: 'http://www.changwujuexi.cn:8080/forbidrent?houseid=' + that.data.houseDetail.id,
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          that.hideModal()
        }
      }
    })
  },
  // 显示抽屉
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
    this.getHouseInfo()
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
      tempHouseDetail.rent = currentItem.rent
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

  getHouseInfo() {
    var that = this
    var ownerId = wx.getStorageSync('Authorization')
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/users/houses?id='  + ownerId,
      success(res) {
        if (res.statusCode === 200) {
          console.log(res)
          that.dataProcess(res.data)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('Authorization')
    var that = this
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/power?userid=' + id,
      success(res) {
        console.log(res)
      }
    })
    that.getHouseInfo()
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