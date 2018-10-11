export default {
  version: '2.0.5',
  data: {
    isiOS: false,
    isAndroid: false,
    gameid: null,
    uid: null,
    token: null,
    adData: '',
    location: '',
    state: 0, //开启二次确认 0不开启
    isCps: 0,
    reText: '11h5.com',
    appid: 'wx661c48766cd0ef5f', //此appid不要修改
    adBaseURL: 'https://adapi.11h5.com/',
    cdnBaseURL: 'https://act.11h5.com/adResource/'
  },

  createUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },

  checkScene(callback) {
    if (this.data.token) {
      wx.request({
        url: this.data.adBaseURL + 'stat/stat',
        data: {
          cmd: 'isCpsUser',
          token: this.data.token,
          gameid: this.data.gameid
        },
        complete: (res) => {
          callback(res)
        }
      })
    } else {
      callback()
    }
  },

  combineStat(args = {}) { //platform stat
    args.item = 'wxa_ad_stat'
    args.subitem.push({
      stat: 'gameid_' + this.data.gameid
    })

		if (!args.focus) {
			args.subitem.push({
				stat: 'id_' + this.data.adData.id
			})
		}

    let data = {
      cmd: 'combineStat',
      uid: this.data.uid,
      item: args.item,
      subItem: JSON.stringify(args.subitem),
      v: Date.now()
    };
    if (args.gameid) {
      data['gameid'] = this.data.gameid
    }
    wx.request({
      url: this.data.adBaseURL + 'comstat/stat',
      data: data,
      method: 'POST',
      success: () => {}
    })
  },
  navigateToMiniProgram(args = {}, callback) {

    let adData = this.data.adData;
    let appid = this.data.appid;
    let path = '';
    let params = {
      scene: `s:${adData.id}`
    }

    if (args.direct) {
      appid = adData.appid;
      let chid = adData.chid;
      let subchid = adData.subchid;

      if (chid) {
        path = `/?chid=${chid}`
      }
      if (subchid) {
        if (chid) {
          path += `&subchid=${subchid}`
        } else {
          path = `/?subchid=${subchid}`
        }
      }
    }

    this.combineStat({
      gameid: true,
      subitem: [{
        ad: 'click'
      }]
    });

    this.confirm({
      type: 'ad'
    }, (r) => {
      this.getRandAd((res) => {
        if (r.error == 0) {
          this.combineStat({
            subitem: [{
              ad: 'directOk'
            }]
          });
          wx.navigateToMiniProgram({
            appId: appid,
            path: path,
            extraData: params,
            success: () => {}
          })
        } else if (r.error == 1) {
          this.combineStat({
            subitem: [{
              ad: 'directFail'
            }]
          });
        }

        if (callback) {
          callback(res)
        }
      })
    })
  },

  confirm(args = {}, callback) {
    //兼容
    if (wx.navigateToMiniProgram) {
      if (this.data.state) { //二次确认
        wx.showModal({
          content: '即将进入其他小程序',
          success: (res) => {
            if (res.confirm) { //确认
              callback({
                error: 0
              })
            } else { //取消
              callback({
                error: 1
              })
            }
          }
        })
      } else {
        callback({
          error: 0
        })
      }
    } else {
      switch (args.type) {
        case 'focus':
          wx.previewImage({
            urls: [this.data.cdnBaseURL + 'focusBox.jpg'],
            success: () => {}
          });
          break;
        case 'ad':
          wx.previewImage({
            urls: [this.data.adData.imgurl],
            success: () => {
              callback({
                error: 2
              })
            }
          });
          break;
      }
    }
  },

  directToBox(args = {}) {
    wx.navigateToMiniProgram({
      appId: this.data.appid,
      extraData: {
        scene: `focus:${args.type ? args.type : 0}` //关注参数
      }
    })
  },

  checkFocus(callback) {
    if (this.data.isCps) {
      return callback()
    } else {
      callback({
        error: 0
      })
    }
  },

  focusBox(args = {}) {
    //根据type类型统计
    if (args.type) { //更多游戏类型按钮
      this.combineStat({
				focus: true,
        subitem: [{
          ad: `btn${args.type}`
        }]
      });
    } else {
      this.combineStat({
				focus: true,
        subitem: [{
          ad: 'btn'
        }]
      });
    }

    this.confirm({
      type: 'focus'
    }, (res) => {
      if (res) {
        if (res.error == 0) {
          this.directToBox(args)
        }
      }
    })
  },

  getRandAd(callback) { //get ad data
    if (this.data.isCps) {
      return callback()
    }
    wx.request({
      url: this.data.adBaseURL + 'api',
      data: {
        cmd: 'getRandAd',
        gameid: this.data.gameid,
        device: this.data.isiOS ? 1 : 0,
        v: Date.now()
      },
      success: (res) => {
        if (callback) {
          if (res.data && res.data.ad) {
            let data = res.data.ad;
            
            if (this.data.location) {
              data.iconurl = data.iconurl.replace(new RegExp(this.data.reText, 'g'), this.data.location);
              data.imgurl = data.imgurl.replace(this.data.reText, this.data.location);
            }
            this.data.adData = data;

						this.combineStat({
							subitem: [{
								ad: 'show'
							}]
						});

            data.iconurl = data.iconurl.split('|');

            let args = {}

            if (data.iconurl.length > 1) {
              args = {
                type: 2, //帧动画
                data: {
                  intervals: data.intervals || 50, //轮换间隔
                  imglist: data.iconurl //图片列表
                }
              }
            } else {
              args = {
                type: 1, //单张图片
                data: data.iconurl[0]
              }
            }
            return callback(args)
          }
          callback()
        }
      },
      fail: () => {
        if (callback) {
          callback()
        }
      }
    })
  },

  init(args = {}, callback) { //init
    this.data.gameid = args.gameid

    if (args.uid) {
      this.data.uid = args.uid
    } else {
      try {
        let uid = wx.getStorageSync('yg_uid')
        if (!uid) {
          uid = this.createUUID()
          wx.setStorageSync('yg_uid', uid)
        }
        this.data.uid = uid
      } catch (e) {
        this.data.uid = 1000
      }
    }

    if (args.token) {
      this.data.token = args.token
    }

    if (args.location) {
      this.data.location = args.location
    }

    if (this.data.location) {
      this.data.adBaseURL = this.data.adBaseURL.replace(this.data.reText, this.data.location)
      this.data.cdnBaseURL = this.data.cdnBaseURL.replace(this.data.reText, this.data.location)
    }

    try {
      let systemInfo = wx.getSystemInfoSync();

      let system = systemInfo.system;
      if (system.indexOf('Android') != -1) {
        this.data.isAndroid = true;
      } else if (system.indexOf('iOS') != -1) {
        this.data.isiOS = true;
      }
    } catch (e) {

    }

    wx.request({
      url: this.data.cdnBaseURL + 'wxa_config.json',
      data: {
        v: Date.now()
      },
      success: (res) => {
        res = res.data
        if (res.state == 0 || res.state) {
          this.data.state = res.state
        }
      }
    })

    this.checkScene((res) => {
      if (res) {
        res = res.data
        if (res && res.isCps) {
          this.data.isCps = res.isCps
        }
      }
      if (callback) {
        callback()
      }
    })
  }
}