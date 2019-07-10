// pages/blueTooth/blueTooth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 初始化蓝牙模块
   */
  initBL() {
    var that = this
    if(wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter({
        success: function(res) {
          // 获取本机的蓝牙状态
          setTimeout(() => {
            console.log('获取本机的蓝牙状态', res)
            that.getBluetoothAdapterState()
          }, 1000)
        },
        fail(err) {
          console.log('初始化蓝牙模块错误',err)
        }
      })
    } else {
      wx.showToast({
        title: '蓝牙模块已开启',
      })
    }
  },

  /**
   * 检测本机蓝牙是否可用
   */
  getBluetoothAdapterState() {
    var that = this
    that.toastTitle = '检查蓝牙状态'
    wx.getBluetoothAdapterState({
      success: function(res) {
        console.log('检测本机蓝牙是否可用',res)
        that.startBluetoothDevicesDiscovery()
      },
      fail(err) {
        console.log('检测本机蓝牙是否可用错误',err)
      }
    })
  },
  /**
   * 开始搜索蓝牙设备
   */
  startBluetoothDevicesDiscovery() {
    var that = this;
    setTimeout(() => {
      wx.startBluetoothDevicesDiscovery({
        services: [],
        allowDuplicatesKey: false,
        interval: 0,
        success: function (res) {
          /* 获取蓝牙设备列表 */
          console.log('获取蓝牙设备列表', res)
          that.getBluetoothDevices()
        },
        fail(res) {
        }
      })
    }, 1000)
  },

/**
 * 获取搜索到的蓝牙设备列表
 */
  getBluetoothDevices() {
    var that = this;
    setTimeout(() => {
      wx.getBluetoothDevices({
        
        success: function (res) {
          console.log('获取搜索到的蓝牙设备列表',res)
          // if (res.devices.length > -1) {
          //   if (JSON.stringify(res.devices).indexOf(that.deviceName) !== -1) {
          //     for (let i = 0; i < res.devices.length; i++) {
          //       if (that.deviceName === res.devices[i].name) {
          //         /* 根据指定的蓝牙设备名称匹配到deviceId */
          //         that.deviceId = that.devices[i].deviceId;
          //         setTimeout(() => {
          //           that.connectTO();
          //         }, 2000);
          //       };
          //     };
          //   } else {
          //   }
          // } else {
          // }
        },
        fail(res) {
          console.log(res, '获取蓝牙设备列表失败=====')
        }
      })
    }, 2000)
  },
/**
 * 
 */
/**
 * 连接蓝牙
 */
  connectTO() {
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function (res) {
        that.connectedDeviceId = deviceId;
        /* 4.获取连接设备的service服务 */
        that.getBLEDeviceServices();
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log(res, '停止搜索')
          },
          fail(res) {
          }
        })
      },
      fail: function (res) {
      }
    })
  },

  /**
   * 获取蓝牙设备的service服务,获取的serviceId有多个要试着连接最终确定哪个是稳定版本的service 获取服务完后获取设备特征值
   */
  getBLEDeviceServices(){
    setTimeout(() => {
      wx.getBLEDeviceServices({
        deviceId: that.connectedDeviceId,
        success: function (res) {
          that.services = res.services
          /* 获取连接设备的所有特征值 */
          that.getBLEDeviceCharacteristics()
        },
        fail: (res) => {
        }
      })
    }, 2000)
  },
  /**
   * 获取蓝牙设备特征值
   */
  getBLEDeviceCharacteristics() {
    setTimeout(() => {
      wx.getBLEDeviceCharacteristics({
        deviceId: connectedDeviceId,
        serviceId: services[2].uuid,
        success: function (res) {
          for (var i = 0; i < res.characteristics.length; i++) {
            if ((res.characteristics[i].properties.notify || res.characteristics[i].properties.indicate) &&
              (res.characteristics[i].properties.read && res.characteristics[i].properties.write)) {
              console.log(res.characteristics[i].uuid, '蓝牙特征值 ==========')
              /* 获取蓝牙特征值 */
              that.notifyCharacteristicsId = res.characteristics[i].uuid
              // 启用低功耗蓝牙设备特征值变化时的 notify 功能
              that.notifyBLECharacteristicValueChange()
            }
          }
        },
        fail: function (res) {
        }
      })
    }, 1000)
  },
  /**
   * 启动notify 蓝牙监听功能 然后使用 wx.onBLECharacteristicValueChange用来监听蓝牙设备传递数据
   */
  notifyBLECharacteristicValueChange() { // 启用低功耗蓝牙设备特征值变化时的 notify 功能
    var that = this;
    console.log('6.启用低功耗蓝牙设备特征值变化时的 notify 功能')
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: that.connectedDeviceId,
      serviceId: that.notifyServicweId,
      characteristicId: that.notifyCharacteristicsId,
      complete(res) {
        /*用来监听手机蓝牙设备的数据变化*/
        wx.onBLECharacteristicValueChange(function (res) {
          /**/
          that.balanceData += that.buf2string(res.value)
          that.hexstr += that.receiveData(res.value)
        })
      },
      fail(res) {
        console.log(res, '启用低功耗蓝牙设备监听失败')
        that.measuringTip(res)
      }
    })
  },
  /*转换成需要的格式*/
  buf2string(buffer) {
    var arr = Array.prototype.map.call(new Uint8Array(buffer), x => x)
    return arr.map((char, i) => {
      return String.fromCharCode(char);
    }).join('');
  },
  receiveData(buf) {
    return this.hexCharCodeToStr(this.ab2hex(buf))
  },
  /*转成二进制*/
  ab2hex(buffer) {
    var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer), function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr.join('')
  },
  /*转成可展会的文字*/
  hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16);
      resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join('');
  },
  /**
   * 向蓝牙设备发送数据
   */
  sendData(str) {
    let that = this;
    let dataBuffer = new ArrayBuffer(str.length)
    let dataView = new DataView(dataBuffer)
    for (var i = 0; i < str.length; i++) {
      dataView.setUint8(i, str.charAt(i).charCodeAt())
    }
    let dataHex = that.ab2hex(dataBuffer);
    this.writeDatas = that.hexCharCodeToStr(dataHex);
    wx.writeBLECharacteristicValue({
      deviceId: that.connectedDeviceId,
      serviceId: that.notifyServicweId,
      characteristicId: that.notifyCharacteristicsId,
      value: dataBuffer,
      success: function (res) {
        console.log('发送的数据：' + that.writeDatas)
        console.log('message发送成功')
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  /**
   * 当不需要连接蓝牙了后就要关闭蓝牙，并关闭蓝牙模块
   */
  // 断开设备连接
  closeConnect() {
    if (that.connectedDeviceId) {
      wx.closeBLEConnection({
        deviceId: that.connectedDeviceId,
        success: function (res) {
          that.closeBluetoothAdapter()
        },
        fail(res) {
        }
      })
    } else {
      that.closeBluetoothAdapter()
    }
  },
  // 关闭蓝牙模块
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter({
      success: function (res) {
      },
      fail: function (err) {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBL()
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