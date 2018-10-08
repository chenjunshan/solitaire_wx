class CardGroup extends eui.Group {
    public card: Card;
    public constructor(card: Card, virtual = false) {
        super();
        this.card = card;
        this.CardInit();
        if (!this.card.status) {
            this.backCardInit();
        }
        if (virtual == true) {
            var image = new eui.Image();
            image.source = RES.getRes("virtual_png");
            image.touchEnabled = false;
            this.addChild(image);
            image.x = -7;
            image.y = -5.5;
        }
    }

    public backCardInit(isCrossScreen = false, scale_X = 1, scale_Y = 1) {
        var image = new eui.Image();
        image.source = RES.getRes("back_png");
        image.touchEnabled = false;
        this.addChild(image);
        image.scaleX = scale_X;
        image.scaleY = scale_Y;
    }

    public CardInit() {
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
        } else {
            bigSuit = new eui.Image();
            bigSuit.source = RES.getRes(this.card.suit + "_png");
            bigSuit.x = 25;
            bigSuit.y = 110;
            this.addChild(bigSuit);
        }

        var value = new eui.Image();
        if (this.card.color == "black") {
            value.source = RES.getRes("b" + this.card.value + "_png");
        } else {
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
    }

    public updataCard(open: boolean, isCrossScreen = false, scale_X = 1, scale_Y = 1) {
        if (open == true) {
            this.card.status = true;
        } else {
            this.card.status = false;
        }
        if (this.card.status == true) {
            if (this.numChildren == 5) {
                this.removeChildAt(4);
            }
        } else {
            this.backCardInit(isCrossScreen,scale_X,scale_Y);
        }

    }
}
