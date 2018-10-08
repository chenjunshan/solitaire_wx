var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Card = (function () {
    function Card(id, suit, value) {
        this.id = id;
        this.suit = suit;
        this.value = value;
        if (suit == "clubs" || suit == "spades")
            this.color = "black";
        else
            this.color = "red";
    }
    return Card;
}());
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map