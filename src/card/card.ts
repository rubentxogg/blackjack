import { Rank } from "./rank.enum.js";
import { Suit } from "./suit.enum.js";

export class Card {
    readonly rank: Rank;
    readonly suit: Suit;
    readonly face: string;

    constructor(rank: number, suit: Suit) {
        this.rank = rank;
        this.suit = suit;
        this.face = `${rank}-${suit}.svg`;
    }
}