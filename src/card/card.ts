import { Rank } from "./rank.enum.js";
import { Suit } from "./suit.enum.js";

export class Card {
    readonly rank: Rank;
    readonly suit: Suit;
    readonly face: string;

    private readonly dictionary = new Map([
        [Rank.ACE, 11],
        [Rank.KING, 10],
        [Rank.QUEEN, 10],
        [Rank.JACK, 10],
        [Rank.TEN, 10],
        [Rank.NINE, 9],
        [Rank.EIGHT, 8],
        [Rank.SEVEN, 7],
        [Rank.SIX, 6],
        [Rank.FIVE, 5],
        [Rank.FOUR, 4],
        [Rank.THREE, 3],
        [Rank.TWO, 2],
    ]);

    constructor(rank: number, suit: Suit) {
        this.rank = rank;
        this.suit = suit;
        this.face = `${rank}-${suit}.svg`;
    }

    protected getValue(): number {
        return this.dictionary.get(this.rank) ?? 0;
    }
}