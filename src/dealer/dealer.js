import { Role } from "../role/role.js";
export class Dealer extends Role {
    constructor() {
        super(Dealer.name.toLocaleLowerCase());
    }
    drawCard(card) {
        const isHidden = (this.hand.length === 2);
        super.drawCard(card, isHidden);
    }
    drawScore() {
        let score = undefined;
        if (this.hand.length === 2) {
            score = '?';
        }
        super.drawScore(score);
    }
    addCard() {
        if (this.hand.length === 2) {
            this.flipCard();
        }
        super.addCard();
    }
    flipCard() {
        const secondCard = this.hand[1];
        const hiddenCard = document.getElementById(`${secondCard.face}-hidden`);
        if (hiddenCard) {
            hiddenCard.src = `./assets/${secondCard.face}.svg`;
            hiddenCard.alt = secondCard.face;
            hiddenCard.id = hiddenCard.alt;
        }
    }
}
