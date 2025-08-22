import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
import { Suit } from "../card/suit.enum.js";
import { Game as Rules } from "../game/game.constants.js";
import { Game } from "../game/game.js";

export abstract class Role {
    protected readonly role: HTMLDivElement;
    private readonly scoreBox: HTMLSpanElement;
    protected hand: Card[] = [];
    protected addCardDelay = Rules.ADD_CARD_DELAY;

    constructor(role: string) {
        this.role = document.getElementById(role) as HTMLDivElement;
        this.scoreBox = document.getElementById(`${role}-score`) as HTMLSpanElement;
    }

    get score() {
        return this.hand.map(card => card.value).reduce((prev, curr) => prev + curr, 0);
    }

    get blackjack(): boolean {
        return (this.hand.length === 2) && (Rules.BLACKJACK === this.score);
    }

    async addCard(): Promise<void> {
        const suit = this.getRandomEnum(Suit);
        const rank = this.getRandomEnum(Rank);

        if (Game.cardsDealt.some(card => (card.suit === suit) && (card.rank === rank))) {
            return this.addCard();
        }

        const card = new Card(suit, rank);

        Game.cardsDealt.push(card);
        this.hand.push(card);

        if ((this.score > Rules.BLACKJACK)) {
            this.hand.find(card => (card.rank === Rank.ACE) && (card.dictionary.get(Rank.ACE) === 11))?.dictionary.set(Rank.ACE, 1);
        }

        this.writeCard(card);
        this.writeScore();

        return new Promise(resolve => setTimeout(resolve, this.addCardDelay));
    }

    protected writeScore(score?: string) {
        this.scoreBox.classList.add('refresh-value');
        this.scoreBox.innerText = score ?? this.score.toString();
        setTimeout(() => this.scoreBox.classList.remove('refresh-value'), 6e2);
    }

    protected writeCard(card: Card, isHidden?: boolean): void {
        const img = document.createElement('img');

        img.alt = !isHidden ? card.face : `${card.face}-hidden`;
        img.id = img.alt;
        img.src = !isHidden ? `${Rules.ASSETS_CARDS}/${card.face}.svg` : `${Rules.ASSETS_CARDS}/HIDDEN.svg`;
        img.className = `${this.role?.id}-card`;

        this.role?.appendChild(img);
    }

    private getRandomEnum(enumeration: any): any {
        const keys = Object.keys(enumeration).filter(key => Number.isNaN(Number.parseInt(key)));
        const enumKey = keys[Math.floor(Math.random() * keys.length)];

        return enumeration[enumKey];
    }

    async clearHand(): Promise<string> {
        this.hand = [];
        this.writeScore();

        document.querySelectorAll<HTMLImageElement>(`.${this.role?.id}-card`).forEach(card => card.className = 'clear-hand');

        return new Promise(resolve => setTimeout(resolve, 1e3)).then(() => this.role.innerHTML = '');
    }
}