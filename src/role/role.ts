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

    addCard(cardsDealt: Card[]): void {
        const suit = this.getRandomEnum(Suit);
        const rank = this.getRandomEnum(Rank);

        if (cardsDealt.some(card => (card.suit === suit) && (card.rank === rank))) {
            return this.addCard(cardsDealt);
        }

        const card = new Card(this.getRandomEnum(Suit), this.getRandomEnum(Rank));

        cardsDealt.push(card);
        this.hand.push(card);
        this.drawCard(card);
        this.computeScore(card);
    }

    private computeScore(card: Card) {
        this.score += card.value;

        if ((Rank.ACE === card.rank) && (this.score > Game.BLACK_JACK)) {
            this.score -= 10;
        }
    }

    private drawCard(card: Card): void {
        const img = document.createElement('img');
        
        img.alt = card.face;
        img.src = `./assets/${card.face}.svg`;

        this.id?.appendChild(img);
    }

    private getRandomEnum(enumeration: any): any {
        const keys = Object.keys(enumeration).filter(key => Number.isNaN(Number.parseInt(key)));
        const enumKey = keys[Math.floor(Math.random() * keys.length)];

        return enumeration[enumKey];
    }
}