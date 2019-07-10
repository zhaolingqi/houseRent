// pages/owner/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['租客', '房屋拥有者']
  },
  nameChange(e) {
    this.setData({
      'myInfo.name': e.detail.value
    })
    console.log(this.data.myInfo)
  },
  telChange(e) {
    this.setData({
      'myInfo.tel': e.detail.value
    })
    console.log(this.data.myInfo)
  },
//   Post
// /users/update
// Integer id
// String username
// String password
// Integer tel
// String name
// Integer idnumber

  save() {
    var that = this
    var id = wx.getStorageSync('Authorization')
    var username = that.data.myInfo.userName
    var password = that.data.myInfo.password
    var tel = that.data.myInfo.tel
    var name = that.data.myInfo.name
    var idnumber = that.data.myInfo.idNumber
    wx.request({
      method:'POST',
      url: 'http://www.changwujuexi.cn:8080/users/update?id=' + id + '&username=' + username + '&password=' + password + '&tel=' + tel + '&name=' + name + '&idnumber=' + idnumber,
      success(res) {
        console.log(res)
        wx.showToast({
          title: '已成功修改信息',
        })
        that.onLoad()
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
      url: 'http://www.changwujuexi.cn:8080/users/list',
      success(res) {
        res.data =res.data.filter(function(item) {
          return item.id == id
        })
        console.log(res.data[0])
        that.setData({
          myInfo: res.data[0]
        })
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