import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
import { Suit } from "../card/suit.enum.js";
import { Game as Rules } from "../game/game.constants.js";
export class Role {
    constructor(role) {
        this.score = 0;
        this.hand = [];
        this.id = document.getElementById(role);
        this.scoreBox = document.getElementById(`${role}-score`);
    }
    addCard(cardsDealt) {
        const suit = this.getRandomEnum(Suit);
        const rank = this.getRandomEnum(Rank);
        if (cardsDealt.some(card => (card.suit === suit) && (card.rank === rank))) {
            return this.addCard(cardsDealt);
        }
        const card = new Card(suit, rank);
        cardsDealt.push(card);
        this.hand.push(card);
        this.drawCard(card);
        this.computeScore(card);
    }
    computeScore(card) {
        this.score += card.value;
        if ((Rank.ACE === card.rank) && (this.score > Rules.BLACK_JACK)) {
            this.score -= 10;
        }
        if (this.scoreBox) {
            this.scoreBox.innerText = this.score.toString();
        }
    }
    drawCard(card) {
        var _a;
        const img = document.createElement('img');
        img.alt = card.face;
        img.src = `./assets/${card.face}.svg`;
        (_a = this.id) === null || _a === void 0 ? void 0 : _a.appendChild(img);
    }
    getRandomEnum(enumeration) {
        const keys = Object.keys(enumeration).filter(key => Number.isNaN(Number.parseInt(key)));
        const enumKey = keys[Math.floor(Math.random() * keys.length)];
        return enumeration[enumKey];
    }
    hasBlackjack() {
        return (this.hand.length === 2) && (Rules.BLACK_JACK === this.score);
    }
}
