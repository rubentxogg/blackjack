var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        if ((Rank.ACE === card.rank) && ((this.score + card.value) > Rules.BLACKJACK)) {
            card.dictionary.set(Rank.ACE, 1);
        }
        Game.cardsDealt.push(card);
        this.hand.push(card);
        this.writeCard(card);
        this.writeScore();
    }
    writeScore(score) {
        this.scoreBox.innerText = score !== null && score !== void 0 ? score : this.score.toString();
    }
    writeCard(card, isHidden) {
        var _a, _b;
        const img = document.createElement('img');
        img.alt = !isHidden ? card.face : `${card.face}-hidden`;
        img.id = img.alt;
        img.src = !isHidden ? `./assets/${card.face}.svg` : `./assets/HIDDEN.svg`;
        img.className = `${(_a = this.role) === null || _a === void 0 ? void 0 : _a.id}-card`;
        (_b = this.role) === null || _b === void 0 ? void 0 : _b.appendChild(img);
    }
    getRandomEnum(enumeration) {
        const keys = Object.keys(enumeration).filter(key => Number.isNaN(Number.parseInt(key)));
        const enumKey = keys[Math.floor(Math.random() * keys.length)];
        return enumeration[enumKey];
    }
    hasBlackjack() {
        return (this.hand.length === 2) && (Rules.BLACKJACK === this.score);
    }
    clearHand() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.hand = [];
            this.writeScore();
            document.querySelectorAll(`.${(_a = this.role) === null || _a === void 0 ? void 0 : _a.id}-card`).forEach(card => card.className = 'clear-hand');
            return new Promise(resolve => setTimeout(resolve, 1e3)).then(() => this.role.innerHTML = '');
        });
    }
}
