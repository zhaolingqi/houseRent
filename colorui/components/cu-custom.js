const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
  },
  /**
   * 组件的初始数据
   */
  // wx.getSystemInfo({
  //   success: e => {
  //     console.log('System', e.statusBarHeight)
  //     this.globalData.StatusBar = e.statusBarHeight;
  //     let custom = wx.getMenuButtonBoundingClientRect();
  //     console.log('custom', custom)
  //     this.globalData.Custom = custom;
  //     this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
  //   }
  // }),
  data: {
    // CustomBar: wx.getSystemInfoSync()['statusBarHeight'],
    CustomBar: wx.getMenuButtonBoundingClientRect().bottom,
    StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})