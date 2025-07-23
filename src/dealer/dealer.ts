import { Card } from "../card/card.js";
import { Role } from "../role/role.js";


export class Dealer extends Role {

    constructor() {
        super(Dealer.name.toLocaleLowerCase());
    }

    protected writeCard(card: Card): void {
        const isHidden = (this.hand.length === 2);

        super.writeCard(card, isHidden);
    }

    protected writeScore(): void {
        const score = !this.isInitialHand ? undefined : '?';

        super.writeScore(score);
    }

    flipCard(): void {
        if (!this.isInitialHand) {
            return;
        }

        const secondCard = this.hand[1];
        const hiddenCard = document.getElementById(`${secondCard.face}-hidden`) as HTMLImageElement;

        if (hiddenCard) {
            hiddenCard.src = `./assets/${secondCard.face}.svg`;
            hiddenCard.alt = secondCard.face;
            hiddenCard.id = hiddenCard.alt;
        }
    }

    get isInitialHand(): boolean {
        return this.hand.length === 2;
    }
}