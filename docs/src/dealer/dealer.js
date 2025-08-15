var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const score = (this.hand.length <= 2) ? '?' : undefined;
        super.writeScore(score);
    }
    flipCard() {
        const _super = Object.create(null, {
            writeScore: { get: () => super.writeScore }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialHand) {
                return;
            }
            const secondCard = this.hand[1];
            const hiddenCard = document.getElementById(`${secondCard.face}-hidden`);
            hiddenCard.className = `flip ${hiddenCard.className}`;
            hiddenCard.src = `${Game.ASSETS_CARDS}/${secondCard.face}.svg`;
            hiddenCard.alt = secondCard.face;
            hiddenCard.id = secondCard.face;
            _super.writeScore.call(this, this.score.toString());
            return new Promise(resolve => setTimeout(resolve, Game.ADD_CARD_DELAY));
        });
    }
    get isInitialHand() {
        return this.hand.length === 2;
    }
}
