var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Records = (function () {
    function Records(card, group, begin, beginIndex, end, endIndex, isflopAnimation) {
        if (isflopAnimation === void 0) { isflopAnimation = false; }
        this.card = card;
        this.group = group;
        this.begin = begin;
        this.beginIndex = beginIndex;
        this.end = end;
        this.endIndex = endIndex;
        this.isflopAnimation = isflopAnimation;
    }
    return Records;
}());
__reflect(Records.prototype, "Records");
//# sourceMappingURL=Records.js.map