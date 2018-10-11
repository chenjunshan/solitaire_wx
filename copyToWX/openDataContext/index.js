/**
 * 微信开放数据域
 * 使用 Canvas2DAPI 在 SharedCanvas 渲染一个排行榜，
 * 并在主域中渲染此 SharedCanvas
 */






/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
var assets = {
  icon: "openDataContext/assets/def_avatar.png",
  blank: "openDataContext/assets/blank.png",
  rank_dialog_bg: "openDataContext/assets/rank_dialog_bg.png",
  rank_dialog_title: "openDataContext/assets/rank_dialog_title.png",
  rank_dialog_item_bg: "openDataContext/assets/rank_dialog_item_bg.png",
  rank_dialog_prev: "openDataContext/assets/rank_dialog_prev.png",
  rank_dialog_next: "openDataContext/assets/rank_dialog_next.png",
  rank_dialog_title_friend: "openDataContext/assets/rank_dialog_title_friend.png",
  rank_dialog_title_group: "openDataContext/assets/rank_dialog_title_group.png",
  rank_first: "openDataContext/assets/first.png",
  rank_second: "openDataContext/assets/second.png",
  rank_third: "openDataContext/assets/third.png",
};
/**
 * canvas 大小
 * 这里暂时写死
 * 需要从主域传入
 */
let canvasWidth;
let canvasHeight;

/**
 * 加载资源函数
 * 理论上只需要加载一次，且在点击时才开始加载
 * 最好与canvasWidht和canvasHeight数据的传入之后进行
 */
preloadAssets();

//获取canvas渲染上下文
var context = sharedCanvas.getContext("2d");
context.globalCompositeOperation = "source-over";


/**
 * 所有头像数据
 * 包括姓名，头像图片，得分
 * 排位序号i会根据parge*perPageNum+i+1进行计算
 */
let totalGroup = [];

/**
 * 创建排行榜
 */
function drawRankPanel() {
  if (!curTitle) {
    return;
  }
  // //绘制背景
  // context.drawImage(assets.rank_dialog_bg, offsetX_rankToBorder, offsetY_rankToBorder, RankWidth, RankHeight);
  // context.drawImage(assets.rank_dialog_title, offsetX_rankToBorder, offsetY_rankToBorder, RankWidth, barHeight);
  // //绘制标题
  // var title = curTitle;
  // var titleH = barHeight * 0.5;
  // var titleW = titleH * title.width / title.height;
  // //根据title的宽高计算一下位置;
  // var titleX = offsetX_rankToBorder + (RankWidth - titleW) / 2;
  // var titleY = offsetY_rankToBorder + (barHeight - titleH) / 2;
  // context.drawImage(title, titleX, titleY, titleW, titleH);
  //获取当前要渲染的数据组
  var start = perPageMaxNum * page;
  currentGroup = totalGroup.slice(start, start + perPageMaxNum);

  context.fillStyle = "#5a5a5a";
  // //创建头像Bar
  drawRankByGroup(currentGroup);
  // //创建按钮
  drawButton();
}
/**
 * 根据屏幕大小初始化所有绘制数据
 */
function init() {
  //排行榜绘制数据初始化
  RankWidth = stageWidth * 0.9;
  RankHeight = stageHeight * 0.7;
  preOffsetY = RankHeight * 0.01;
  scaleY = stageHeight / 1920
  barWidth = RankWidth * 0.9;
  barHeight = (RankHeight - preOffsetY * (perPageMaxNum + 1)) / (perPageMaxNum + 2);
  fontSize = barHeight * 0.3;
  offsetX_rankToBorder = (stageWidth - RankWidth) / 2;
  // offsetY_rankToBorder = (stageHeight - RankHeight) / 2;
  offsetY_rankToBorder = 250 * scaleY;
  // preOffsetY = (RankHeight - barHeight) / (perPageMaxNum + 1);

  startX = offsetX_rankToBorder + offsetX_rankToBorder;
  startY = offsetY_rankToBorder + 125 * scaleY + preOffsetY;
  avatarSize = barHeight * 0.7;
  intervalX = barWidth / 14;
  textOffsetY = (barHeight + fontSize) / 2;
  textMaxSize = RankWidth * 0.2;

  //按钮绘制数据初始化
  var btn = assets.rank_dialog_prev;
  buttonHeight = barHeight * 0.4;
  buttonWidth = buttonHeight * btn.width / btn.height;
  buttonOffset = RankWidth / 3;
  lastButtonX = (offsetX_rankToBorder + buttonOffset - buttonWidth) / 3 * 2;
  nextButtonX = offsetX_rankToBorder + 2 * buttonOffset + lastButtonX / 3;
  nextButtonY = lastButtonY = offsetY_rankToBorder + RankHeight - buttonHeight - (barHeight - buttonHeight) / 2;
  var data = wx.getSystemInfoSync();
  canvasWidth = data.windowWidth;
  canvasHeight = data.windowHeight;
}

/**
 * 创建两个点击按钮
 */
function drawButton() {
  if ((page + 1) * perPageMaxNum < totalGroup.length) {
    context.fillText("下一页", nextButtonX, nextButtonY + textOffsetY / 2 - fontSize * 0.1, textMaxSize * 2);
    // context.drawImage(assets.rank_dialog_next, nextButtonX, nextButtonY, buttonWidth, buttonHeight);
  }
  if (page > 0) {
    context.fillText("上一页", lastButtonX, lastButtonY + textOffsetY / 2 - fontSize * 0.1, textMaxSize * 2);
    // context.drawImage(assets.rank_dialog_prev, lastButtonX, lastButtonY, buttonWidth, buttonHeight);
  }
  var length = Math.ceil(totalGroup.length / perPageMaxNum);
  if (length > 0) {
    var str = "第" + (page + 1) + "/" + length + "页";
    var size = fontSize * 0.8;
    context.font = size + "px SimHei";

    var x = offsetX_rankToBorder + (RankWidth - context.measureText(str).width) / 2;
    var y = offsetY_rankToBorder + RankHeight - barHeight - preOffsetY;
    context.fillText(str, x, y + textOffsetY);
  }
}


/**
 * 根据当前绘制组绘制排行榜
 */
function drawRankByGroup(currentGroup) {
  for (var i = 0; i < currentGroup.length; i++) {
    var data = currentGroup[i];
    drawByData(data, i);
  }
}

/**
 * 根据绘制信息以及当前i绘制元素
 */
function drawByData(data, i) {
  var temp = data;
  var score = getValue(data);
  var x = startX;
  var y = startY + i * (barHeight + preOffsetY);
  //绘制底框
  context.drawImage(assets.rank_dialog_item_bg, startX, y + barHeight - 3, barWidth, 3);
  x += preOffsetY;
  //设置字体
  context.font = fontSize + "px SimHei";
  indexWidth = context.measureText("999").width;
  //绘制序号
  var key = page * perPageMaxNum + i + 1;
  var rankImg = "";
  if (key == 1) {
    rankImg = assets.rank_first;
  } else if (key == 2) {
    rankImg = assets.rank_second;
  } else if (key == 3) {
    rankImg = assets.rank_third;
  }
  if (rankImg) {
    context.drawImage(rankImg, x, y + barHeight * 0.3, barHeight * 0.4, barHeight * 0.4);
  } else {
    context.fillText(" " + key, x, y + textOffsetY, textMaxSize);
  }
  x += indexWidth + preOffsetY;
  //绘制头像
  var avatarX = x;
  var avatarY = y + (barHeight - avatarSize) / 2;
  if (temp.avatarUrl == null || temp.avatarUrl == undefined || temp.avatarUrl == "") {
    context.drawImage(assets.icon, avatarX, avatarY, avatarSize, avatarSize);
  } else {
    var avatar = wx.createImage();
    avatar.src = temp.avatarUrl;
    avatar.onload = function () {
      if (isDrawRank) {
        context.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
      }
    }
    avatar.onerror = function () {
      context.drawImage(assets.icon, avatarX, avatarY, avatarSize, avatarSize);
    }
  }
  x += avatarSize + preOffsetY;
  //绘制名称
  var name = (temp.nickname + "");
  context.fillText(name, x, y + textOffsetY, textMaxSize * 2);
  x += textMaxSize * 2 + intervalX;
  //绘制分数
  context.fillText(score + "", x, y + textOffsetY, textMaxSize);
}

/**
 * 点击处理
 */
function onTouchEnd(event) {
  var x = event.clientX * sharedCanvas.width / canvasWidth;
  var y = event.clientY * sharedCanvas.height / canvasHeight;
  if (x > lastButtonX - buttonWidth * 0.2 && x < lastButtonX + buttonWidth * 1.2 &&
    y > lastButtonY - buttonHeight * 0.2 && y < lastButtonY + buttonHeight * 1.2) {
    //在last按钮的范围内
    if (page > 0) {
      buttonClick(0);
    }
  }
  if (x > nextButtonX - buttonWidth * 0.2 && x < nextButtonX + buttonWidth * 1.2 &&
    y > nextButtonY - buttonHeight * 0.2 && y < nextButtonY + buttonHeight * 1.2) {
    //在next按钮的范围内
    if ((page + 1) * perPageMaxNum < totalGroup.length) {
      buttonClick(1);
    }
  }

}
/**
 * 根据传入的buttonKey 执行点击处理
 * 0 为上一页按钮
 * 1 为下一页按钮
 */
function buttonClick(buttonKey) {
  var old_buttonY;
  if (buttonKey == 0) {
    //上一页按钮
    old_buttonY = lastButtonY;
    lastButtonY += 10;
    page--;
    renderDirty = true;
    loop();
    console.log('上一页');
    setTimeout(() => {
      lastButtonY = old_buttonY;
      //重新渲染必须标脏
      renderDirty = true;
      loop();
    }, 100);
  } else if (buttonKey == 1) {
    //下一页按钮
    old_buttonY = nextButtonY;
    nextButtonY += 10;
    page++;
    renderDirty = true;
    loop();
    console.log('下一页');
    setTimeout(() => {
      nextButtonY = old_buttonY;
      //重新渲染必须标脏
      renderDirty = true;
      loop();
    }, 100);
  }

}

function bubbleSort(data) {
  var arr = data.concat();
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      var cur = getValue(arr[j]);
      var next = getValue(arr[j + 1]);
      if (cur < next) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

function getValue(data) {
  return JSON.parse(data.KVDataList[0].value).wxgame.score;
}

/**
 * 创建排行榜
 */
function drawNextRankPanel() {
  var data = getNextRank();
  console.log(data)
  if (!data) {
    return;
  }
  var temp = data;
  var w = stageWidth * 0.5;
  var h = w;
  var x = (stageWidth - w) / 2;
  var y = (stageHeight - h) / 2 - stageHeight * 0.1;
  var imgH = h * 0.35;
  var imgW = imgH;
  var vGap = h * 0.12;
  var str = "第" + temp.rank + "名"
  var size = h * 0.08;
  var textGap = size / 2;

  context.font = size + "px SimHei";

  var textX = x + (w - context.measureText(str).width) / 2;
  var textY = y + textGap * 2 + vGap;
  var imgX = x + (w - imgW) / 2;
  var imgY = textY + vGap - textGap;
  var name = (temp.nickname + "").slice(0, 10);
  var nameX = x + (w - context.measureText(name).width) / 2;
  var nameY = imgY + vGap + imgH;
  var score = "还差" + temp.D_value + "分超越好友";
  var scoreX = x + (w - context.measureText(score).width) / 2;
  var scoreY = nameY + vGap;

  //绘制背景
  // context.fillStyle = "#000000";
  // context.globalAlpha = "0.6";
  // context.fillRect(x, y, w, h)
  context.drawImage(assets.blank, x, y, h, h);
  context.fillStyle = "#2dab62";
  // context.globalAlpha = "1";
  context.fillText(str, textX, textY, imgW * 0.6);
  //绘制头像
  var url = (temp.avatarUrl == null || temp.avatarUrl == undefined || temp.avatarUrl == "") ? assets.icon : temp.avatarUrl;
  var avatarX = imgX;
  var avatarY = imgY;
  if (temp.avatarUrl == null || temp.avatarUrl == undefined || temp.avatarUrl == "") {
    context.drawImage(assets.icon, avatarX, avatarY, imgW, imgH);
  } else {
    var avatar = wx.createImage();
    avatar.src = temp.avatarUrl;
    avatar.onload = function () {
      if (isDrawNextRank) {
        context.drawImage(avatar, avatarX, avatarY, imgW, imgH);
      }
    }
    avatar.onerror = function () {
      context.drawImage(assets.icon, avatarX, avatarY, imgW, imgH);
    }
  }
  context.fillStyle = "#494949";
  context.fillText(name, nameX, nameY, w * 0.8);
  context.fillStyle = "#FF0000";
  context.fillText(score, scoreX, scoreY, w * 0.8);
}

function getNextRank() {
  var result = null;
  for (var i = totalGroup.length - 1; i >= 0; i--) {
    var temp = totalGroup[i];
    var tempScore = getValue(temp);
    if (tempScore > curScore) {
      temp["rank"] = i + 1;
      temp["D_value"] = tempScore - curScore;
      result = temp;
      break;
    }
  }
  return result;
}

function drawEndRankPanel() {
  if (!endRanks || endRanks.length <= 0) {
    return;
  }
  for (var i = 0; i < endRanks.length; i++) {
    drawEndRnakItem(i);
  }
}

function drawEndRnakItem(i) {
  var temp = endRanks[i];
  if (!temp) {
    return
  }
  var w = stageWidth * endW;
  var h = stageHeight * endH;
  var x = stageWidth * endStartX;
  var y = stageHeight * endStartY;
  var itemW = w / 3;
  var itemH = h;
  var gap = itemH * 0.08;
  var itemY = y;
  var size = itemH * 0.14;
  var nameSize = size * 0.5;
  var rankY = itemY + gap * 1.5 + size / 2;
  var avatarW = itemW * 0.6;
  var avatarH = avatarW;
  var avatarY = rankY + gap;
  var nameY = avatarY + avatarH + gap + nameSize / 2;
  var scoreY = nameY + gap * 1.5 + size / 2;
  var itemX = x + i * itemW;
  var color = "#FFFFFF";
  if (temp.openid == selfOpenId) {
    color = "#6283FF";
  }
  context.fillStyle = color;
  // context.globalAlpha = "0.8";
  // context.fillRect(itemX, itemY, itemW, itemH);

  // context.globalAlpha = "1";

  context.fillStyle = "#b68523";
  context.font = size + "px SimHei";
  var rank = "" + temp.rank;
  var rankX = itemX + (itemW - context.measureText(rank).width) / 2;
  context.fillText(rank, rankX, rankY, itemW);

  var avatarX = itemX + (itemW - avatarW) / 2;
  if (temp.avatarUrl == null || temp.avatarUrl == undefined || temp.avatarUrl == "") {
    context.drawImage(assets.icon, avatarX, avatarY, avatarW, avatarH);
  } else {
    var avatar = wx.createImage();
    avatar.src = temp.avatarUrl;
    avatar.onload = function () {
      if (isDrawEndRank) {
        context.drawImage(avatar, avatarX, avatarY, avatarW, avatarH);
      }
    }
    avatar.onerror = function () {
      context.drawImage(assets.icon, avatarX, avatarY, avatarW, avatarH);
    }
  }

  context.fillStyle = "#000000";
  context.font = nameSize * 1.5 + "px SimHei";
  var name = (temp.nickname + "").slice(0, 6);
  var nameX = itemX + (itemW - context.measureText(name).width) / 2;
  context.fillText(name, nameX, nameY, itemW);

  context.fillStyle = "#FF2600";
  context.font = size + "px SimHei";
  var score = "" + getValue(temp);
  var scoreX = itemX + (itemW - context.measureText(score).width) / 2;
  context.fillText(score, scoreX, scoreY, itemW);
}

/////////////////////////////////////////////////////////////////// 相关缓存数据

/**********************数据相关***************************/

/**
 * 渲染标脏量
 * 会在被标脏（true）后重新渲染
 */
let renderDirty = false;

/**
 * 当前绘制组
 */
let currentGroup = [];
/**
 * 每页最多显示个数
 * 建议大于等于4个
 */
let perPageMaxNum = 5;
/**
 * 当前页数,默认0为第一页
 */
let page = 0;
/***********************绘制相关*************************/
/**
 * 舞台大小
 */
let stageWidth;
let stageHeight;
/**
 * 实际大小与设计大小比例
 */
let scaleY;
let scaleX;
/**
 * 排行榜大小
 */
let RankWidth;
let RankHeight;

/**
 * 每个头像条目的大小
 */
let barWidth;
let barHeight;
/**
 * 条目与排行榜边界的水平距离
 */
let offsetX_barToRank
/**
 * 绘制排行榜起始点X
 */
let startX;
/**
 * 绘制排行榜起始点Y
 */
let startY;
/**
 * 每行Y轴间隔offsetY
 */
let preOffsetY;
/**
 * 按钮大小
 */
let buttonWidth;
let buttonHeight;
/**
 * 上一页按钮X坐标
 */
let lastButtonX;
/**
 * 下一页按钮x坐标
 */
let nextButtonX;
/**
 * 上一页按钮y坐标
 */
let lastButtonY;
/**
 * 下一页按钮y坐标
 */
let nextButtonY;
/**
 * 两个按钮的间距
 */
let buttonOffset;

/**
 * 字体大小
 */
let fontSize;
/**
 * 文本文字Y轴偏移量
 * 可以使文本相对于图片大小居中
 */
let textOffsetY;
/**
 * 头像大小
 */
let avatarSize;
/**
 * 名字文本最大宽度，名称会根据
 */
let textMaxSize;
/**
 * 绘制元素之间的间隔量
 */
let intervalX;
/**
 * 排行榜与舞台边界的水平距离
 */
let offsetX_rankToBorder;
/**
 * 排行榜与舞台边界的竖直距离
 */
let offsetY_rankToBorder;
/**
 * 绘制排名的最大宽度
 */
let indexWidth;
/**
 * 绘制当前标题
 */
let curTitle;

/**
 * 是否绘制排行榜
 */
let isDraw = false;
/**
 * 是否绘制排行榜
 */
let isDrawRank;
let isDrawNextRank;
let isDrawEndRank;

let curScore;
let endRanks;
let selfOpenId;
let endStartX;
let endStartY;
let endW;
let endH;
//////////////////////////////////////////////////////////
/**
 * 监听点击
 */
wx.onTouchEnd((event) => {
  var l = event.changedTouches.length;
  for (var i = 0; i < l; i++) {
    onTouchEnd(event.changedTouches[i]);
  }
});

wx.onMessage((data) => {
  console.log(data.command);
  if (data.command === 'render') {
    // ... 重绘 sharedCanvas
    renderDirty = data.data;
  } else if (data.command === 'clearSharedCanvas') {
    renderDirty = true;
    isDrawRank = false;
    isDrawNextRank = false;
    isDrawEndRank = false;
    isDraw = false;
    loop();
  } else if (data.command === 'setUserCloudStorage') {
    setUserCloudStorage(data.data);
  } else if (data.command === 'removeUserCloudStorage') {
    removeUserCloudStorage(data.data);
  } else if (data.command === 'getUserCloudStorage') {
    getUserCloudStorage(data.data);
  } else if (data.command === 'getFriendCloudStorage') {
    curTitle = assets.rank_dialog_title_friend;
    totalGroup = [];
    isDrawEndRank = false;
    isDrawNextRank = false;
    isDrawRank = true;
    isDraw = true;
    getFriendCloudStorage(data.data);
  } else if (data.command === 'getGroupCloudStorage') {
    curTitle = assets.rank_dialog_title_group;
    totalGroup = [];
    isDrawEndRank = false;
    isDrawNextRank = false;
    isDrawRank = true;
    isDraw = true;
    getGroupCloudStorage(data.data);
  } else if (data.command === 'getNextFriendCloudStorage') {
    totalGroup = [];
    isDrawEndRank = false;
    isDrawNextRank = true;
    isDrawRank = false;
    isDraw = true;
    curScore = data.data.topScore;
    getFriendCloudStorage(data.data);
  } else if (data.command === 'getEndFriendCloudStorage') {
    totalGroup = [];
    isDrawEndRank = true;
    isDrawNextRank = false;
    isDrawRank = false;
    isDraw = true;
    selfOpenId = data.data.opendId;
    endStartX = data.data.x;
    endStartY = data.data.y;
    endW = data.data.w;
    endH = data.data.h;
    getFriendCloudStorage(data.data);
  }
})

function setUserCloudStorage(data) {
  wx.setUserCloudStorage({
    KVDataList: data.KVDataList,
    success: function (res) {
      console.log('setUserCloudStorage sucess');
      console.log(res)
    },
    fail: function (res) {
      console.log('setUserCloudStorage fail');
      console.log(res)
    }
  })
}

function removeUserCloudStorage(data) {
  wx.removeUserCloudStorage({
    KVDataList: data.KVDataList,
    success: function (res) {
      console.log('removeUserCloudStorage sucess');
      console.log(res)
    },
    fail: function (res) {
      console.log('removeUserCloudStorage fail');
      console.log(res)
    }
  })
}

function getUserCloudStorage(data) {
  wx.getUserCloudStorage({
    keyList: data.keyList,
    success: function (res) {
      console.log('getUserCloudStorage sucess');
      console.log(res);
    },
    fail: function (res) {
      console.log('getUserCloudStorage fail');
      console.log(res);
    }
  })
}

function getFriendCloudStorage(data) {
  wx.getFriendCloudStorage({
    keyList: data.keyList,
    success: function (res) {
      console.log('getFriendCloudStorage sucess');
      console.log(res);
      totalGroup = bubbleSort(res.data);
      if (isDrawEndRank && selfOpenId) {
        console.log("isDrawEndRank")
        endRanks = [];
        var index = -1;
        for (var i = 0; i < totalGroup.length; i++) {
          var temp = totalGroup[i];
          temp["rank"] = i + 1;
          index = i;
          if (temp.openid == selfOpenId) {
            endRanks.push(temp);
            if (i > 0) {
              var befTemp = totalGroup[i - 1];
              if (befTemp) {
                befTemp["rank"] = i;
                endRanks.unshift(befTemp);
              }
            }
            if (i < totalGroup.length - 1) {
              var nextTemp = totalGroup[i + 1];
              if (nextTemp) {
                nextTemp["rank"] = i + 2;
                endRanks.push(nextTemp);
              }
            }
            break;
          }
        }
        if (endRanks.length < 3 && totalGroup.length > 2) {
          if (index == 0) {
            var next = totalGroup[index + 2];
            next["rank"] = index + 3;
            endRanks.push(next);
          }
          if (index == totalGroup.length - 1) {
            var bef = totalGroup[index - 2];
            bef["rank"] = index - 1;
            endRanks.unshift(bef);
          }
        }
      }
      renderDirty = true;
      loop();
    },
    fail: function (res) {
      console.log('getFriendCloudStorage fail');
      console.log(res);
    }
  })
}

function getGroupCloudStorage(data) {
  wx.getGroupCloudStorage({
    shareTicket: data.shareTicket,
    keyList: data.keyList,
    success: function (res) {
      console.log('getGroupCloudStorage sucess');
      console.log(res);
      totalGroup = bubbleSort(res.data);
      renderDirty = true;
      loop();
    },
    fail: function (res) {
      console.log('getGroupCloudStorage fail');
      console.log(res);
    }
  })
}

function getUserInfo() {
  wx.getUserInfo({
    openIdList: ['selfOpenId'],
    success: function (res) {
      console.log('getUserInfo sucess');
      console.log(res)
    },
    fail: function (res) {
      console.log('getUserInfo fail');
      console.log(res)
    }
  })
}



/**
 * 资源加载
 */
function preloadAssets() {
  var preloaded = 0;
  var count = 0;
  for (var asset in assets) {
    count++;
    var img = wx.createImage();
    img.onload = function () {
      preloaded++;
      if (preloaded == count) {
        setTimeout(function () {
          createScene();
        }, 500);
      }
    }
    img.src = assets[asset];
    assets[asset] = img;
  }
}
/**
 * 绘制屏幕
 * 这个函数会在加载完所有资源之后被调用
 */
function createScene() {
  if (sharedCanvas.width && sharedCanvas.height) {
    console.log('初始化完成')
    stageWidth = sharedCanvas.width;
    stageHeight = sharedCanvas.height;
  } else {
    // console.log(`sharedCanvas.width:${sharedCanvas.width}    sharedCanvas.height：${sharedCanvas.height}`)
  }
  init();
  // requestAnimationFrame(loop);
}
/**
 * 循环函数
 * 每帧判断一下是否需要渲染
 * 如果被标脏，则重新渲染
 */
function loop() {
  if (renderDirty) {
    // console.log(`stageWidth :${stageWidth}   stageHeight:${stageHeight}`)
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    if (isDraw) {
      if (isDrawRank) {
        console.log("drawRank")
        drawRankPanel();
      } else if (isDrawNextRank) {
        console.log("drawNextRank")
        drawNextRankPanel();
      } else if (isDrawEndRank) {
        console.log("drawEndRank")
        drawEndRankPanel();
      }
    }
    renderDirty = false;
  }
  // requestAnimationFrame(loop);
}