export class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.face = `${rank}-${suit}.svg`;
    }
}
