import { Rank } from "./rank.enum.js";
import { Suit } from "./suit.enum.js";
export class Card {
    constructor(suit, rank) {
        this.dictionary = new Map([
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
        this.suit = suit;
        this.rank = rank;
        this.face = `${Suit[this.suit]}-${Rank[this.rank]}`;
    }
    get value() {
        var _a;
        return (_a = this.dictionary.get(this.rank)) !== null && _a !== void 0 ? _a : 0;
    }
}
