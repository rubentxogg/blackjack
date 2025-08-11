import { Card } from "../card/card.js";
import { Role } from "../role/role.js";


export class Dealer extends Role {

    constructor() {
        super(Dealer.name.toLocaleLowerCase());
    }

    protected writeCard(card: Card): void {
        super.writeCard(card, this.isInitialHand);
    }

    protected writeScore(): void {
        const score = (this.hand.length <= 2) ? '?' : undefined;

        super.writeScore(score);
    }

    flipCard(): void {
        if (!this.isInitialHand) {
            return;
        }

        const secondCard = this.hand[1];
        const hiddenCard = document.getElementById(`${secondCard.face}-hidden`) as HTMLImageElement;

        hiddenCard.className = `flip ${hiddenCard.className}`;
        hiddenCard.src = `./assets/${secondCard.face}.svg`;
        hiddenCard.alt = secondCard.face;
        hiddenCard.id = secondCard.face;

        super.writeScore(this.score.toString());
    }

    get isInitialHand(): boolean {
        return this.hand.length === 2;
    }
}