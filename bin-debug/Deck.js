var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Deck = (function () {
    function Deck() {
        var i, suit, value;
        this.cards = [];
        var values = [1, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        var suits = ['clubs', 'spades', 'hearts', 'diamonds'];
        for (i = 0; i < 52; i++) {
            suit = suits[i % 4];
            value = values[Math.floor(i / 4)];
            var card = new Card(i + 1, suit, value);
            this.cards.push(card);
        }
    }
    Deck.prototype.shuffle = function () {
        var len, i, j, item_j;
        len = this.cards.length;
        for (i = 0; i < len; i++) {
            j = Math.floor(len * Math.random());
            item_j = this.cards[j];
            this.cards[j] = this.cards[i];
            this.cards[i] = item_j;
        }
    };
    Deck.prototype.getCard = function (card_id) {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id == card_id)
                return this.cards[i];
        }
        return null;
    };
    return Deck;
}());
__reflect(Deck.prototype, "Deck");
//# sourceMappingURL=Deck.js.map