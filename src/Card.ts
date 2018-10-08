class Card {
    public id: number;
    public suit: string;
    public value: number;
    public color: string;
    public status: boolean;
    public moveState:string;
    constructor(id: number, suit: string, value: number) {
        this.id = id;
        this.suit = suit;
        this.value = value;
        if (suit == "clubs" || suit == "spades")
            this.color = "black";
        else
            this.color = "red";
    }
}