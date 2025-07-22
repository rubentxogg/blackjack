import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
import { Suit } from "../card/suit.enum.js";
import { Game as Rules } from "../game/game.constants.js";
import { Game } from "../game/game.js";

export abstract class Role {
    private readonly role: HTMLElement | null;
    private readonly scoreBox: HTMLElement | null;
    private hand: Card[] = [];

    constructor(role: string) {
        this.role = document.getElementById(role);
        this.scoreBox = document.getElementById(`${role}-score`);
    }

    get score() {
        return this.hand.map(card => card.value).reduce((prev, curr) => prev + curr, 0)
    }

    addCard(): void {
        const suit = this.getRandomEnum(Suit);
        const rank = this.getRandomEnum(Rank);

        if (Game.cardsDealt.some(card => (card.suit === suit) && (card.rank === rank))) {
            return this.addCard();
        }

        const card = new Card(suit, rank);

        Game.cardsDealt.push(card);
        this.hand.push(card);
        this.drawCard(card);
        this.drawScore();
    }

    public drawScore() {
        if (this.scoreBox) {
            this.scoreBox.innerText = this.score.toString();
        }
    }

    private drawCard(card: Card): void {
        const img = document.createElement('img');
        
        img.alt = card.face;
        img.src = `./assets/${card.face}.svg`;
        img.className = `${this.role?.id}-card`;

        this.role?.appendChild(img);
    }

    private getRandomEnum(enumeration: any): any {
        const keys = Object.keys(enumeration).filter(key => Number.isNaN(Number.parseInt(key)));
        const enumKey = keys[Math.floor(Math.random() * keys.length)];

        return enumeration[enumKey];
    }

    hasBlackjack(): boolean {
        return (this.hand.length === 2) && (Rules.BLACK_JACK === this.score);
    }

    clearHand(): void {
        this.hand = [];
        this.drawScore();
        document.querySelectorAll(`.${this.role?.id}-card`).forEach(card => card.remove());
    }
}