import { Role } from "../role/role.js";
export class Dealer extends Role {
    constructor() {
        super(Dealer.name.toLocaleLowerCase());
    }
    writeCard(card) {
        const isHidden = (this.hand.length === 2);
        super.writeCard(card, isHidden);
    }
    writeScore() {
        const score = !this.isInitialHand ? undefined : '?';
        super.writeScore(score);
    }
    flipCard() {
        if (!this.isInitialHand) {
            return;
        }
        const secondCard = this.hand[1];
        const hiddenCard = document.getElementById(`${secondCard.face}-hidden`);
        if (hiddenCard) {
            hiddenCard.src = `./assets/${secondCard.face}.svg`;
            hiddenCard.alt = secondCard.face;
            hiddenCard.id = hiddenCard.alt;
            super.writeScore(this.score.toString());
        }
    }
    get isInitialHand() {
        return this.hand.length === 2;
    }
}
