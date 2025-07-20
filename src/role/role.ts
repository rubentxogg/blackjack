import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
import { Suit } from "../card/suit.enum.js";
import { Game } from "../game.constants.js";
import { Role as RoleType } from "./role.enum.js";

export class Role {
    private readonly id: HTMLElement | null;
    score = 0;
    hand: Card[] = [];

    constructor(role: RoleType) {
        this.id = document.getElementById(role);
    }

    addCard(): void {
        const card = new Card(Suit.CLUBS, Rank.ACE);

        this.hand.push(card);

        const img = document.createElement('img');

        img.alt = card.face;
        img.src = `./assets/${card.face}.svg`;

        this.id?.appendChild(img);

        this.score += card.value;

        if((Rank.ACE === card.rank) && (this.score > Game.BLACK_JACK)) {
            this.score -= 10;
        }
    }
}