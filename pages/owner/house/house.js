// pages/owner/house/house.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 1,
    scrollLeft: 0,
    levelRange: ['Vip', 'Close', 'Normal'],
    statusRange: ['已授权', '未授权'],
    houseDetail:null,
    house: [],
  },
  changeRent() {
    var that = this
    wx.request({
      method:'POST',
      url: 'http://www.changwujuexi.cn:8080/allowrent?houseid=' + that.data.houseDetail.id,
      success(res) {
        console.log(res)
      }
    })
  },
  save() {

  },
  submit() {

  },
  addHouse() {
    wx.navigateTo({
      url: 'addHouse/addHouse',
    })
  },

  // 修改权限等级
  levelChange(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let tempHouseDetail = this.data.houseDetail
    tempHouseDetail.lockInfo[index].lockLevel = e.detail.value
    this.setData({
      'houseDetail': tempHouseDetail
    })
    console.log(this.data.houseDetail)
  },
  // 删除房屋
  delete() {
    var that = this
    console.log(typeof (this.data.houseDetail.id))
    wx.request({
      method:'DELETE',
      url: 'http://www.changwujuexi.cn:8080/deletehouse?houseid=' + that.data.houseDetail.id,
      success(res) {
        console.log(res)
      }
    })
    this.hideModal()
  },

  // 显示抽屉
  showModal(e) {
    // this.tabSelect(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
      houseDetail: this.data.house[e.currentTarget.dataset.index]
    })
  },
  // 隐藏抽屉
  hideModal(e) {
    this.setData({
      modalName: null
    })
    this.getHouseInfo()
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 对得到的房屋信息进行处理
   */
  dataProcess(houseInfo) {
    console.log(houseInfo)
    var house = []
    var tempHouseDetail = {
      houseRegion:'',
      id:'',
      lockInfo:[]
    }
    var tempLockInfo = {
      lockName:'',
      lockLevel:''
    }
    var tempKeyNumber
    var tempKeyName
    houseInfo.forEach(function(currentItem,index) {
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
      house:house
    })
  },

  /**
   * 请求获取房屋信息
   */

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
    var that = this
    var ownerId = wx.getStorageSync('Authorization')
    this.getHouseInfo()
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