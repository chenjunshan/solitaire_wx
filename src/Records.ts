class Records {
    public card: CardGroup;
    public group: egret.Sprite;
    public begin: string;
    public beginIndex: number;
    public end: string;
    public endIndex: number;
    public isflopAnimation: boolean;
    constructor(card: CardGroup, group: egret.Sprite, begin: string, beginIndex: number, end: string, endIndex: number, isflopAnimation = false) {
        this.card = card;
        this.group = group;
        this.begin = begin;
        this.beginIndex = beginIndex;
        this.end = end;
        this.endIndex = endIndex;
        this.isflopAnimation = isflopAnimation;
    }
}