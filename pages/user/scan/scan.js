// pages/user//scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelRange: ['Vip', 'Close', 'Normal'],   
  },
  toBL(e) {
    var index = e.currentTarget.dataset.index
    var lockLevel = this.data.houseDetail.lockInfo[index].lockLevel
    var userLevel = this.data.houseDetail.level
    console.log('lockLevel', lockLevel, 'userLevel', userLevel)
    if (userLevel <= lockLevel) {
      wx.navigateTo({
        url: '../../blueTooth/blueTooth',
      })
    } else {
      wx.showToast({
        title: '用户权限不足',
        icon:'none',
        duration: 2000
      })
    }
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

    this.setData({
      house: house
    })
    console.log(this.data.house)
    console.log(this.data.userLevel)
    var userLevel = this.data.userLevel
    house.forEach(function(item) {
      for (let i = 0; i < userLevel.length; i++) {
        if (item.id == userLevel[i][0]) {
          item.level = userLevel[i][1]
        }
      }
    })
    console.log('house',house)
    this.setData({
      house: house
    })

  },

  getHouseInfo() {
    var that = this
    var ownerId = wx.getStorageSync('Authorization')
    wx.request({
      url: 'http://www.changwujuexi.cn:8080/users/houses?id=' + ownerId,
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
        console.log(res.data)
        that.setData({
          userLevel: res.data
        })
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