// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      url: '../../image/home/1.jpg'
    }, {
      url: '../../image/home/2.jpg',
    }, {
      url: '../../image/home/3.jpg'
    }],
    elements: [{
      title: '房屋共享',
      name: 'house',
      nav: 'login',
      color: 'cyan',
      icon: 'home'
    },
    {
      title: '汽车共享',
      name: 'Car',
      nav: 'block',
      color: 'blue',
      icon: 'deliver'
    },
    {
      title: '...',
      name: '...',
      nav: 'block',
      color: 'purple',
      icon: 'font'
    },
    {
      title: '... ',
      name: '...',
      nav: 'block',
      color: 'mauve',
      icon: 'icon'
    },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        console.log('checkIsSupportSoterAuthentication', res)
      },
      fail(res) {
        console.log(res)
      }
    })
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode: 'fingerPrint',
      success(res) {
        console.log('checkIsSoterEnrolledInDevice', res)
      }
    })
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹解锁',
      success(res) {
        console.log('startSoterAuthentication', res)
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