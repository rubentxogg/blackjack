import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
import { Suit } from "../card/suit.enum.js";
import { Game as Rules } from "../game/game.constants.js";
import { Game } from "../game/game.js";
export class Role {
    constructor(role) {
        this.hand = [];
        this.role = document.getElementById(role);
        this.scoreBox = document.getElementById(`${role}-score`);
    }
    get score() {
        return this.hand.map(card => card.value).reduce((prev, curr) => prev + curr, 0);
    }
    addCard() {
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
    drawScore() {
        if (this.scoreBox) {
            this.scoreBox.innerText = this.score.toString();
        }
    }
    drawCard(card) {
        var _a, _b;
        const img = document.createElement('img');
        img.alt = card.face;
        img.src = `./assets/${card.face}.svg`;
        img.className = `${(_a = this.role) === null || _a === void 0 ? void 0 : _a.id}-card`;
        (_b = this.role) === null || _b === void 0 ? void 0 : _b.appendChild(img);
    }
    getRandomEnum(enumeration) {
        const keys = Object.keys(enumeration).filter(key => Number.isNaN(Number.parseInt(key)));
        const enumKey = keys[Math.floor(Math.random() * keys.length)];
        return enumeration[enumKey];
    }
    hasBlackjack() {
        return (this.hand.length === 2) && (Rules.BLACK_JACK === this.score);
    }
    clearHand() {
        var _a;
        this.hand = [];
        this.drawScore();
        document.querySelectorAll(`.${(_a = this.role) === null || _a === void 0 ? void 0 : _a.id}-card`).forEach(card => card.remove());
    }
}
