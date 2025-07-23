import { Rank } from "./rank.enum.js";
import { Suit } from "./suit.enum.js";

export class Card {
    readonly suit: Suit;
    readonly rank: Rank;

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

    constructor(suit: Suit, rank: Rank) {
        this.suit = suit;
        this.rank = rank;
    }

    get value(): number {
        return this.dictionary.get(this.rank) ?? 0;
    }

    get face(): string {
        return `${Suit[this.suit]}-${Rank[this.rank]}`;
    }
}