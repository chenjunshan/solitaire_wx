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
var CardGroup = (function (_super) {
    __extends(CardGroup, _super);
    function CardGroup(card, virtual) {
        if (virtual === void 0) { virtual = false; }
        var _this = _super.call(this) || this;
        _this.card = card;
        _this.CardInit();
        if (!_this.card.status) {
            _this.backCardInit();
        }
        if (virtual == true) {
            var image = new eui.Image();
            image.source = RES.getRes("virtual_png");
            image.touchEnabled = false;
            _this.addChild(image);
            image.x = -7;
            image.y = -5.5;
        }
        return _this;
    }
    CardGroup.prototype.backCardInit = function (isCrossScreen, scale_X, scale_Y) {
        if (isCrossScreen === void 0) { isCrossScreen = false; }
        if (scale_X === void 0) { scale_X = 1; }
        if (scale_Y === void 0) { scale_Y = 1; }
        var image = new eui.Image();
        image.source = RES.getRes("back_png");
        image.touchEnabled = false;
        this.addChild(image);
        image.scaleX = scale_X;
        image.scaleY = scale_Y;
    };
    CardGroup.prototype.CardInit = function () {
        var image = new eui.Image();
        image.source = RES.getRes("BG_png");
        image.touchEnabled = false;
        this.addChild(image);
        var bigSuit;
        if (this.card.value > 10) {
            bigSuit = new eui.Image();
            bigSuit.source = RES.getRes(this.card.value + "big_png");
            bigSuit.x = 0;
            bigSuit.y = 0;
            this.addChild(bigSuit);
        }
        else {
            bigSuit = new eui.Image();
            bigSuit.source = RES.getRes(this.card.suit + "_png");
            bigSuit.x = 25;
            bigSuit.y = 110;
            this.addChild(bigSuit);
        }
        var value = new eui.Image();
        if (this.card.color == "black") {
            value.source = RES.getRes("b" + this.card.value + "_png");
        }
        else {
            value.source = RES.getRes("r" + this.card.value + "_png");
        }
        value.x = 8;
        value.y = 2;
        this.addChild(value);
        var suit = new eui.Image();
        suit.source = RES.getRes(this.card.suit + "_png");
        suit.width = 50;
        suit.height = 50;
        suit.x = 85;
        suit.y = 12;
        this.addChild(suit);
    };
    CardGroup.prototype.updataCard = function (open, isCrossScreen, scale_X, scale_Y) {
        if (isCrossScreen === void 0) { isCrossScreen = false; }
        if (scale_X === void 0) { scale_X = 1; }
        if (scale_Y === void 0) { scale_Y = 1; }
        if (open == true) {
            this.card.status = true;
        }
        else {
            this.card.status = false;
        }
        if (this.card.status == true) {
            if (this.numChildren == 5) {
                this.removeChildAt(4);
            }
        }
        else {
            this.backCardInit(isCrossScreen, scale_X, scale_Y);
        }
    };
    return CardGroup;
}(eui.Group));
__reflect(CardGroup.prototype, "CardGroup");
//# sourceMappingURL=CardGroup.js.map