import { Card } from "../card/card.js";
import { Role } from "../role/role.js";


export class Dealer extends Role {

    constructor() {
        super(Dealer.name.toLocaleLowerCase());
    }

    protected drawCard(card: Card): void {
        const isHidden = (this.hand.length === 2);

        super.drawCard(card, isHidden);
    }

    protected drawScore(): void {
        let score = undefined;

        if (this.hand.length === 2) {
            score = '?';
        }

        super.drawScore(score);
    }

    addCard(): void {
        if (this.hand.length === 2) {
            this.flipCard();
        }
        super.addCard();
    }

    private flipCard(): void {
        const secondCard = this.hand[1];
        const hiddenCard = document.getElementById(`${secondCard.face}-hidden`) as HTMLImageElement;

        if(hiddenCard) {
            hiddenCard.src = `./assets/${secondCard.face}.svg`;
            hiddenCard.alt = secondCard.face;
            hiddenCard.id = hiddenCard.alt;
        }
    }
}