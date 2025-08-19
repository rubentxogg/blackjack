var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Rank } from "../card/rank.enum.js";
import { Game } from "../game/game.constants.js";
import { Role } from "../role/role.js";
export class Dealer extends Role {
    constructor() {
        super(Dealer.name.toLocaleLowerCase());
    }
    get offerInsurance() {
        var _a;
        return (Rank.ACE === ((_a = this.hand[0]) === null || _a === void 0 ? void 0 : _a.rank));
    }
    get hiddenCard() {
        return document.querySelectorAll("[id$=hidden]")[0];
    }
    writeCard(card) {
        super.writeCard(card, this.isInitialHand);
    }
    writeScore() {
        const score = this.isInitialHand ? '?' : undefined;
        super.writeScore(score);
    }
    flipCard(index) {
        const _super = Object.create(null, {
            writeScore: { get: () => super.writeScore }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialHand) {
                return;
            }
            const card = this.hand[index];
            const hiddenCard = document.getElementById(`${card.face}-hidden`);
            hiddenCard.className = `flip ${hiddenCard.className}`;
            hiddenCard.src = `${Game.ASSETS_CARDS}/${card.face}.svg`;
            hiddenCard.alt = card.face;
            hiddenCard.id = card.face;
            const score = (index === 0) ? this.hand[index].value.toString() : this.score.toString();
            _super.writeScore.call(this, score);
            return new Promise(resolve => setTimeout(resolve, Game.ADD_CARD_DELAY));
        });
    }
    get isInitialHand() {
        return this.hand.length <= 2;
    }
    checkBlackjack() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hiddenCard.style.opacity = '1';
            const card = this.hand[0];
            if ((Rank.ACE === card.rank) || (card.dictionary.get(card.rank) === 10)) {
                const checkMessage = document.createElement('span');
                checkMessage.textContent = 'The dealer is checking if he has blackjack...';
                checkMessage.className = 'dealer-check';
                this.hiddenCard.style.opacity = '0.5';
                this.role.append(checkMessage);
                return new Promise(resolve => setTimeout(resolve, 4500))
                    .then(() => checkMessage.textContent = this.blackjack ? 'The dealer has blackjack' : 'The dealer doesn\'t have blackjack')
                    .then(() => new Promise(resolve => setTimeout(resolve, 4500)))
                    .then(() => this.role.removeChild(checkMessage))
                    .then(() => this.hiddenCard.style.opacity = '1')
                    .then(() => true);
            }
            return Promise.resolve(false);
        });
    }
    askForInsurance() {
        if (!this.offerInsurance) {
            return false;
        }
        const checkMessage = document.createElement('span');
        checkMessage.id = 'dealer-message';
        checkMessage.textContent = 'The dealer offers you insurance';
        checkMessage.className = 'dealer-check';
        this.hiddenCard.style.opacity = '0.5';
        this.role.append(checkMessage);
        return true;
    }
}
