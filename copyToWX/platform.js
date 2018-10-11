/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */
import sdk_wxa from './sdk_wxa.js'
class WxgamePlatform {

  name = 'wxgame';

  SDKWxa = sdk_wxa;

  openDataContext = new WxgameOpenDataContext();

  vibrateShort() {
    return new Promise((resolve, reject) => {
      resolve(wx.vibrateShort())
    })
  }
  vibrateLong() {
    return new Promise((resolve, reject) => {
      resolve(wx.vibrateLong())
    })
  }

  onShow(callback) {
    return new Promise((resolve, reject) => {
      wx.onShow(callback)
    })
  }
  offShow(callback) {
    return new Promise((resolve, reject) => {
      wx.offShow(callback)
    })
  }
  onHide(callback) {
    return new Promise((resolve, reject) => {
      wx.onHide(callback)
    })
  }
  offHide(callback) {
    return new Promise((resolve, reject) => {
      wx.offHide(callback)
    })
  }

  getLaunchOptionsSync() {
    return new Promise((resolve, reject) => {
      resolve(wx.getLaunchOptionsSync())
    })
  }

  getSystemInfo() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          resolve(false)
        }
      })
    })
  }

  getSystemInfoSync() {
    return new Promise((resolve, reject) => {
      resolve(wx.getSystemInfoSync())
    })
  }

  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          resolve(false)
        }
      })
    })
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          resolve(res.userInfo);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  showModal(data) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: data.title,
        content: data.content,
        showCancel: data.showCancel,
        success: function (res) {
          if (res.confirm) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  createUserInfoButton(data) {
    return new Promise((resolve, reject) => {
      let userInfoButton = wx.createUserInfoButton({
        type: data.type,
        text: data.text,
        image: data.image,
        style: data.style,
        withCredentials: data.withCredentials,
        lang: data.lang,
      })
      resolve(userInfoButton);
    })
  }

  getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  openSetting() {
    return new Promise((resolve, reject) => {
      wx.openSetting({
        success: function (res) {
          if (res.authSetting["scope.userInfo"] == true) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  shareAppMessage(data) {
    return new Promise((resolve, reject) => {
      wx.shareAppMessage({
        title: data.title,
        imageUrl: data.imageUrl,
        query: data.query,
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }
  updateShareMenu(data) {
    return new Promise((resolve, reject) => {
      wx.updateShareMenu({
        withShareTicket: data.withShareTicket,
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }
  showShareMenu(data) {
    return new Promise((resolve, reject) => {
      wx.showShareMenu({
        withShareTicket: true,
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }
  hideShareMenu() {
    return new Promise((resolve, reject) => {
      wx.hideShareMenu({
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }
  onShareAppMessage(callback) {
    return new Promise((resolve, reject) => {
      wx.onShareAppMessage(callback)
    })
  }
  offShareAppMessage(callback) {
    return new Promise((resolve, reject) => {
      wx.offShareAppMessage(callback)
    })
  }
  getShareInfo(data) {
    return new Promise((resolve, reject) => {
      wx.getShareInfo({
        shareTicket: data.shareTicket,
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  createGameClubButton(data) {
    return new Promise((resolve, reject) => {
      let gameClubButton = wx.createGameClubButton({
        type: data.type,
        text: data.text,
        image: data.image,
        icon: data.icon,
        style: data.style
      })
      resolve(gameClubButton);
    })
  }

  hideToast() {
    return new Promise((resolve, reject) => {
      wx.hideToast({
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  hideLoading() {
    return new Promise((resolve, reject) => {
      wx.hideLoading({
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  showToast(data) {
    return new Promise((resolve, reject) => {
      wx.showToast({
        title: data.title,
        icon: data.icon,
        image: data.image,
        duration: data.duration,
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  showLoading(data) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: data.title,
        mask: data.mask,
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  showLoading(data) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: data.title,
        mask: data.mask,
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  createBannerAd(data) {
    return new Promise((resolve, reject) => {
      let bannerAd = wx.createBannerAd({
        adUnitId: data.adUnitId,
        style: data.style
      })
      resolve(bannerAd);
    })
  }

  createRewardedVideoAd(data) {
    return new Promise((resolve, reject) => {
      let rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: data.adUnitId
      })
      resolve(rewardedVideoAd);
    })
  }

  setUserCloudStorage(data) {
    this.openDataContext.postMessage({
      command: "setUserCloudStorage",
      data: data
    })
  }
  removeUserCloudStorage(data) {
    this.openDataContext.postMessage({
      command: "removeUserCloudStorage",
      data: data
    })
  }
  getUserCloudStorage(data) {
    this.openDataContext.postMessage({
      command: "getUserCloudStorage",
      data: data
    })
  }
  getFriendCloudStorage(data) {
    this.openDataContext.postMessage({
      command: "getFriendCloudStorage",
      data: data
    })
  }
  getGroupCloudStorage(data) {
    this.openDataContext.postMessage({
      command: "getGroupCloudStorage",
      data: data
    })
  }
  getNextFriendCloudStorage(data) {
    this.openDataContext.postMessage({
      command: "getNextFriendCloudStorage",
      data: data
    })
  }
  getEndFriendCloudStorage(data) {
    this.openDataContext.postMessage({
      command: "getEndFriendCloudStorage",
      data: data
    })
  }

  clearSharedCanvas() {
    this.openDataContext.postMessage({
      command: "clearSharedCanvas"
    })
  }

  openSharedCanvas() {
    this.openDataContext.postMessage({
      command: "open"
    })
  }

  closeSharedCanvas() {
    this.openDataContext.postMessage({
      command: "close"
    })
  }

  loadResSharedCanvas() {
    this.openDataContext.postMessage({
      command: "loadRes"
    })
  }

  previewImage(data) {
    return new Promise((resolve, reject) => {
      wx.previewImage({
        current: data.current,
        urls: data.urls,
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }

  checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: function (res) {
          resolve(true);
        },
        fail: function (res) {
          resolve(false);
        }
      })
    })
  }
}

class WxgameOpenDataContext {
  createDisplayObject(type, width, height) {
    const bitmapdata = new egret.BitmapData(sharedCanvas);
    bitmapdata.$deleteSource = false;
    const texture = new egret.Texture();
    texture._setBitmapData(bitmapdata);
    const bitmap = new egret.Bitmap(texture);
    bitmap.width = width;
    bitmap.height = height;

    if (egret.Capabilities.renderMode == "webgl") {
      const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
      const context = renderContext.context;
      ////需要用到最新的微信版本
      ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
      ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
      if (!context.wxBindCanvasTexture) {
        egret.startTick((timeStarmp) => {
          egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
          bitmapdata.webGLTexture = null;
          return false;
        }, this);
      }
    }
    return bitmap;
  }


  postMessage(data) {
    const openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage(data);
  }
}


window.platform = new WxgamePlatform();