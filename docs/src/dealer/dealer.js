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
        if (!this.isInitialHand) {
            return;
        }
        const secondCard = this.hand[1];
        const hiddenCard = document.getElementById(`${secondCard.face}-hidden`);
        hiddenCard.className = `flip ${hiddenCard.className}`;
        hiddenCard.src = `./assets/${secondCard.face}.svg`;
        hiddenCard.alt = secondCard.face;
        hiddenCard.id = secondCard.face;
        super.writeScore(this.score.toString());
    }
    get isInitialHand() {
        return this.hand.length === 2;
    }
}
