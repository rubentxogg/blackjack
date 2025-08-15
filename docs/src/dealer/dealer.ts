import { Card } from "../card/card.js";
import { Game } from "../game/game.constants.js";
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

    async flipCard(): Promise<void> {
        if (!this.isInitialHand) {
            return;
        }

        const secondCard = this.hand[1];
        const hiddenCard = document.getElementById(`${secondCard.face}-hidden`) as HTMLImageElement;

        hiddenCard.className = `flip ${hiddenCard.className}`;
        hiddenCard.src = `${Game.ASSETS_CARDS}/${secondCard.face}.svg`;
        hiddenCard.alt = secondCard.face;
        hiddenCard.id = secondCard.face;

        super.writeScore(this.score.toString());
        return new Promise(resolve => setTimeout(resolve, Game.ADD_CARD_DELAY));
    }

    get isInitialHand(): boolean {
        return this.hand.length === 2;
    }
}