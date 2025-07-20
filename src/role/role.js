import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
import { Suit } from "../card/suit.enum.js";
import { Game } from "../game.constants.js";
export class Role {
    constructor(role) {
        this.score = 0;
        this.hand = [];
        this.id = document.getElementById(role);
    }
    addCard() {
        var _a;
        const card = new Card(Suit.CLUBS, Rank.ACE);
        this.hand.push(card);
        const img = document.createElement('img');
        img.alt = card.face;
        img.src = `./assets/${card.face}.svg`;
        (_a = this.id) === null || _a === void 0 ? void 0 : _a.appendChild(img);
        this.score += card.value;
        if ((Rank.ACE === card.rank) && (this.score > Game.BLACK_JACK)) {
            this.score -= 10;
        }
    }
}
