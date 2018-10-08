class Deck {
    public cards:Card[];
    constructor() {
        var i,suit,value;
        this.cards=[];
        var values = [1, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        var suits = ['clubs', 'spades', 'hearts', 'diamonds'];
        for (i = 0; i < 52; i++) {
            suit = suits[i%4];
            value = values[Math.floor(i / 4)];
            var card = new Card(i + 1, suit, value);
            this.cards.push(card);
        }
    }

    public shuffle(){
        var len, i, j, item_j;

        len = this.cards.length;
        for (i = 0; i < len; i++) {
            j = Math.floor(len * Math.random());
            item_j = this.cards[j];
            this.cards[j] = this.cards[i];
            this.cards[i] = item_j;
        }
    }
    
    public getCard(card_id){
        for (var i = 0; i < this.cards.length; i++) {
            if(this.cards[i].id == card_id)
                return this.cards[i];
        }
        return null;
    }
}