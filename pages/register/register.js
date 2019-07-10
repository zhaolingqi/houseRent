// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:null,
    picker: ['租客', '房屋拥有者']
  },
  identityChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  register(e) {
    console.log(e.detail.value.identity)
    wx.showModal({
      title: '确认提交注册申请',
      content: '',
      success() {
        wx.request({
          url: 'http://www.changwujuexi.cn:8080/users/registration?identity=' + e.detail.value.identity,
          method: 'POST',
          data: {
            'userName': e.detail.value.username,
            'password': e.detail.value.password,
            'name': e.detail.value.truename,
            'tel': parseInt(e.detail.value.phonenumber),
            'idNumber': parseInt(e.detail.value.idnumber)
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              wx.showToast({
                title: '注册成功',
              })
              wx.navigateTo({
                url: '../login/login',
              })
            }
          },
          fail(res) {
            console.log(res)
            wx.showToast({
              title: '注册失败',
            })
          }
        })
      }
    })
  },

  validId(e) {
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(e.detail.value)) {
      wx.showToast({
        title: '身份证号不符合规范',
        icon: 'none'
      })
    }
    console.log(e.detail.value)
  },

  // var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  // if(!regIdNo.test(idNo)){
  // alert('身份证号填写有误');
  // return false;



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