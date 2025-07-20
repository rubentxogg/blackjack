import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
import { Suit } from "../card/suit.enum.js";
import { Role as RoleEnum } from "./role.enum.js";

export class Role {
    private readonly id: HTMLElement | null;
    score = 0;
    hand: Card[] = [];

    constructor(role: RoleEnum) {
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
    }
}