class Solitaire {
    public deck: Deck;
    public columns: Card[][];
    public suits: Card[][];
    public wastes: Card[];
    public hands: Card[];
    constructor() {
        this.deck = new Deck();
        this.columns = [[], [], [], [], [], [], []];
        this.wastes = [];
        this.hands = [];
        this.suits = [[], [], [], []];
    }

    public shuffle() {
        this.deck.shuffle();//洗牌
    }

    public deleteData(){
        this.columns = [[], [], [], [], [], [], []];
        this.wastes = [];
        this.hands = [];
        this.suits = [[], [], [], []];
    }

    public init() {
        var j = 0, count = 0;
        for (var i = 0; i < 52; i++) {
            // add the cards to the columns
            var card = this.deck.cards[i];
            card.status = false;
            if (j >= 7) {
                this.hands.push(card);
            } else if (count == j) {
                // card.status = true;
                this.columns[j++].push(card);
                count = 0;
            } else {
                this.columns[j].push(card);
                count++;
            }
        }
        this.count = 0;
        //  console.log(this.dfs(0));
        //console.log(1);
    }

    public isOver(suits: Card[][]) {
        for (var i = 0; i < suits.length; i++) {
            var len = suits[i].length;
            if (len != 13 || this.suits[i][len - 1].value != 13)
                return false;
        }
        return true;
    }
    public isDfsOver() {
        for (var i = 0; i < this.columns.length; i++) {
            for (var j = 0; j < this.columns[i].length; j++) {
                if (!this.columns[i][j].status) {
                    return false;
                }
            }
        }
        return true;
    }
    private count: number;
    public dfs(step): boolean {
        console.log("123");
        var i, j, k, l, cardI, cardJ, card, result;
        //判断是否结束
        if (this.isDfsOver()) {
            return true;
        }
        if (step > 100) {
            return false;
        }

        for (i = 0; i < this.columns.length; i++) {//下方7列
            if (this.columns[i].length == 0) { continue; }
            var moveCardEnd = this.columns[i][this.columns[i].length - 1];
            for (l = 0; l < this.suits.length; l++) {
                if ((this.suits[l].length == 0 && moveCardEnd.value == 1) || (this.suits[l].length > 0 && this.suits[l][this.suits[l].length - 1].value + 1 == moveCardEnd.value && this.suits[l][this.suits[l].length - 1].suit == moveCardEnd.suit)) {
                    this.suits[l].push(moveCardEnd);
                    this.columns[i].pop();
                    if (this.columns[i].length > 0) {
                        this.columns[i][this.columns[i].length - 1].status = true;
                    }
                    // console.log("columns:"+i+" to suit:"+l);
                    result = this.dfs(step + 1);
                    if (result) {
                        this.count = 0;
                        return true;
                    } else {
                        if (this.columns[i].length > 0) {
                            if (this.columns[i].length > 1 && this.columns[i][this.columns[i].length - 2].status) {
                            } else {
                                this.columns[i][this.columns[i].length - 1].status = false;
                            }

                        }
                        this.suits[l].pop();
                        this.columns[i].push(moveCardEnd);
                        //    console.log("Back=> columns:"+i+" to suit:"+l);
                    }
                    break;
                }
            }
            cardI = cardJ = -1;
            for (j = 0; j < this.columns[i].length; j++) {
                if (this.columns[i][j].status == true) {
                    cardI = i;
                    cardJ = j;
                    card = this.columns[cardI].slice(cardJ);
                    break;
                }
            }
            if (cardI == -1 || cardJ == -1) {
                continue;
            }
            if (cardJ == 0 && this.columns[cardI][cardJ].value == 13) {
                continue;
            }
            for (k = 0; k < this.columns.length; k++) {
                if (cardI == k) { continue; }
                var len = this.columns[k].length;
                var toCardEnd = this.columns[k][len - 1];
                if (len == 0) {
                    if (this.columns[cardI][cardJ].value == 13 && cardJ != 0) {
                        this.columns[cardI] = this.columns[cardI].slice(0, cardJ);
                        this.columns[k] = this.columns[k].concat(card);
                        if (this.columns[cardI].length > 0) {
                            this.columns[cardI][this.columns[cardI].length - 1].status = true;
                        }
                        result = this.dfs(step + 1);
                        if (result) {
                            this.count = 0;
                            return true;
                        } else {
                            if (this.columns[cardI].length > 0) {
                                this.columns[cardI][this.columns[cardI].length - 1].status = false;
                            }
                            this.columns[cardI] = this.columns[cardI].concat(card);
                            this.columns[k] = [];
                        }
                        break;
                    }
                } else {
                    if (this.columns[cardI][cardJ].value + 1 == toCardEnd.value && this.columns[cardI][cardJ].color != toCardEnd.color) {
                        this.columns[cardI] = this.columns[cardI].slice(0, cardJ);
                        this.columns[k] = this.columns[k].concat(card);
                        if (this.columns[cardI].length > 0) {
                            this.columns[cardI][this.columns[cardI].length - 1].status = true;
                        }
                        result = this.dfs(step + 1);
                        if (result) {
                            this.count = 0;
                            return true;
                        } else {
                            if (this.columns[cardI].length > 0) {
                                this.columns[cardI][this.columns[cardI].length - 1].status = false;
                            }
                            this.columns[cardI] = this.columns[cardI].concat(card);
                            this.columns[k] = this.columns[k].slice(0, len);
                        }
                    }
                }
            }
        }
        //废牌区
        if (this.wastes.length > 0) {
            var wasteCardEnd = this.wastes[this.wastes.length - 1];
            for (l = 0; l < this.suits.length; l++) { // suits
                if ((this.suits[l].length == 0 && wasteCardEnd.value == 1) || (this.suits[l].length > 0 && this.suits[l][this.suits[l].length - 1].value + 1 == wasteCardEnd.value && this.suits[l][this.suits[l].length - 1].suit == wasteCardEnd.suit)) {
                    this.suits[l].push(wasteCardEnd);
                    this.wastes.pop();
                    result = this.dfs(step + 1);
                    if (result) {
                        this.count = 0;
                        return true;
                    } else {
                        this.suits[l].pop();
                        this.wastes.push(wasteCardEnd);
                    }
                    break;
                }
            }
            for (k = 0; k < this.columns.length; k++) { //columns
                var toCardEnd = this.columns[k][this.columns[k].length - 1];
                if (this.columns[k].length == 0) {
                    if (wasteCardEnd.value == 13) {
                        this.wastes.pop();
                        this.columns[k].push(wasteCardEnd);
                        result = this.dfs(step + 1);
                        if (result) {
                            this.count = 0;
                            return true;
                        } else {
                            this.wastes.push(wasteCardEnd);
                            this.columns[k].pop();
                        }
                        break;
                    }
                } else {
                    if (wasteCardEnd.value + 1 == toCardEnd.value && wasteCardEnd.color != toCardEnd.color) {
                        this.wastes.pop();
                        this.columns[k].push(wasteCardEnd);
                        result = this.dfs(step + 1);
                        if (result) {
                            this.count = 0;
                            return true;
                        } else {
                            this.wastes.push(wasteCardEnd);
                            this.columns[k].pop();
                        }
                    }
                }
            }
        }
        //手牌区
        if (this.count > this.hands.length + this.wastes.length) {
            return false;
        }
        if (this.hands.length > 0) {
            var handsCardEnd = this.hands.pop();
            handsCardEnd.status = true;
            this.wastes.push(handsCardEnd);
            this.count++;
            this.dfs(step + 1);
        } else if (this.hands.length == 0 && this.wastes.length != 0) {
            this.hands = this.wastes.reverse();
            this.wastes = [];
            this.count++;
            this.dfs(step + 1);
        }
        return false;
    }

    public isInFree(card_id) {//判断是否在废牌区域最上方
        var len = this.wastes.length;
        if (len > 0) {
            var card = this.wastes[len - 1];
            if (card && card.id == card_id)
                return true;
        }
        return false;
    }

    public isSuitable(card_id) {
        if (this.isInFree(card_id)) {//判断是否在废牌区域最上方
            return true;
        }
        for (var i = 0; i < 7; i++) {//判断是否在下方7列的最上方
            if (this.columns[i].length > 0) {
                var card = this.columns[i][this.columns[i].length - 1];
                if (card.id == card_id)
                    return true;
            }
        }
        return false;
    }

    public isInSuit(card_id) {
        for (var i = 0; i < 4; i++) {//判断是否在提交区域
            var len = this.suits[i].length;
            if (len > 0) {
                var card = this.suits[i][len - 1];
                if (card.id == card_id)
                    return true;
            }
        }
        return false;
    }

    public isDraggable(card_id) {
        var i, j, card;
        if (this.isInSuit(card_id)) {//判断是否在提交区域
            return true;
        }
        if (this.isSuitable(card_id)) {//判断是否在废牌区域最上方或者下方7列最上方
            return true;
        }
        for (i = 0; i < 7; i++) {//判断是否在下方7列，并且属于可移动牌
            if (this.columns[i].length <= 1)
                continue;
            for (j = this.columns[i].length - 2; j >= 0; j--) {
                card = this.columns[i][j];
                if (card.status != true || card.color == this.columns[i][j + 1].color || card.value != this.columns[i][j + 1].value + 1) {
                    break;
                }
                if (card.id == card_id) {
                    return true;
                }
            }
        }
        return false;
    }

    public isAddable(i, nextCard) {
        var len = this.columns[i].length;
        if (len == 0) {
            if (nextCard.value == 13) {
                return true;
            }
            return false;
        }
        var card = this.columns[i][len - 1];
        if (card.value == nextCard.value + 1 && card.color != nextCard.color) {
            return true;
        }
        return false;
    }

    public isSuitAddable(i, nextCard) {
        var suit = this.suits[i];
        var len = this.suits[i].length;
        if (len == 0) {
            if (nextCard.value == 1) {
                return true;
            }
            return false;
        }
        if (suit[len - 1].value == nextCard.value - 1 && suit[len - 1].suit == nextCard.suit) {
            return true;
        }
        return false;
    }

    public isWon() {
        for (var i = 0; i < 4; i++) {
            var len = this.suits[i].length;
            if (len != 13 || this.suits[i][len - 1].value != 13)
                return false;
        }
        return true;
    }
}