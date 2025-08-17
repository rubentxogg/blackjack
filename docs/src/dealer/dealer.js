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
    // TODO
    checkBlackjack() {
        const card = this.hand[0];
        if ((Rank.ACE === card.rank) || (card.dictionary.get(card.rank) === 10)) {
            // checking for blackjack...
            return this.blackjack;
        }
        return false;
    }
}
