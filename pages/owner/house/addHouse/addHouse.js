// pages/owner/house/addHouse/addHouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelRange: ['Vip', 'Close', 'Normal'],
    lockLevel:null,
    lockDetail:null,
    currentIndex:null,
    addr:'',
    lockInfo:[
    ]
  },

  submit(e){
    var key = ''
    var keyName = ''
    var addrname = this.data.addr
    var ownerId = wx.getStorageSync('Authorization')
    console.log(ownerId)
    for (let i = 0; i < this.data.lockInfo.length; i++) {
      key = key + this.data.lockInfo[i].lockLevel + ','
      keyName = keyName + this.data.lockInfo[i].lockName + ','
    }
    key = key.substring(0,key.length - 1)
    keyName = keyName.substring(0, keyName.length - 1)
    console.log(key)
    console.log(keyName)
    if(addrname !== '') {
      wx.request({
        url: 'http://www.changwujuexi.cn:8080/addhouse?ownerid=' + ownerId,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        data: {
          'key': key,
          'keyName': keyName,
          'addr': addrname
        },
        success(res) {
          console.log(res)
          if(res.data === 200) {
            // wx.reLaunch({
            //   url: '../house',
            // })
            wx.navigateBack({
              delta: 2
            })
            wx.showToast({
              title: '提交成功',
              duration: 2000
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '提交失败，房屋地址不能为空',
        icon:'none',
        duration: 2000
      })
    }
  },

  addrChange(e) {
    this.setData({
      addr:e.detail.value
    })
    console.log(e.detail.vaule)
  },
  // 保存修改
  save() {
    let tempLockInfo = this.data.lockInfo
    if(this.data.currentIndex === null) {
      tempLockInfo.push(this.data.lockDetail)
    } else {
      tempLockInfo[this.data.currentIndex] = this.data.lockDetail
    }
    console.log(tempLockInfo)
    this.setData({
      lockInfo:tempLockInfo,
      currentIndex: null
    })
    this.hideModal()
  },
  // 修改锁名字
  lockNameChange(e) {
    // 
    console.log(e.detail.value)
    this.setData({
      'lockDetail.lockName': e.detail.value
    })
  },
  // 修改锁的权限等级
  levelChange(e) {
    console.log(e)
    this.setData({
      'lockDetail.lockLevel': e.detail.value
    })
    console.log(this.data.lockDetail)
  },

  showModal(e) {
    if (e.currentTarget.dataset.index === undefined) {
      this.setData({
        lockDetail:null
      })
    } else {
      this.setData({
        lockDetail: this.data.lockInfo[e.currentTarget.dataset.index],
        currentIndex: e.currentTarget.dataset.index
      })
    }
    console.log(this.data.lockDetail)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null,
      currentIndex: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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