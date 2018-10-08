var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        // this.width = game.Size.width;
        // this.height = game.Size.height;
        _this.initView();
        return _this;
    }
    LoadingUI.prototype.initView = function () {
        var _this = this;
        var shape = new egret.Shape();
        this.addChild(shape);
        var img = new eui.Image();
        img.horizontalCenter = 0;
        img.verticalCenter = 0;
        RES.getResAsync("bg_loading_png", function (data) {
            img.texture = data;
        }, this);
        this.addChild(img);
        this.addEventListener(egret.Event.RESIZE, function () {
            shape.graphics.clear();
            shape.graphics.beginFill(0x000000);
            shape.graphics.drawRect(0, 0, _this.width, _this.height);
            shape.graphics.endFill();
            img.height = _this.height;
            img.width = 1080 * _this.height / 1920;
        }, this);
    };
    LoadingUI.prototype.setProgress = function (current, total) {
    };
    return LoadingUI;
}(eui.UILayer));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map