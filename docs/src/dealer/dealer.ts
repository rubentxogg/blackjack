import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
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
        const score = this.isInitialHand ? '?' : undefined;

        super.writeScore(score);
    }

    async flipCard(index: number): Promise<void> {
        if (!this.isInitialHand) {
            return;
        }

        const card = this.hand[index];
        const hiddenCard = document.getElementById(`${card.face}-hidden`) as HTMLImageElement;

        hiddenCard.className = `flip ${hiddenCard.className}`;
        hiddenCard.src = `${Game.ASSETS_CARDS}/${card.face}.svg`;
        hiddenCard.alt = card.face;
        hiddenCard.id = card.face;

        const score = (index === 0) ? this.hand[index].value.toString() : this.score.toString();
        super.writeScore(score);

        return new Promise(resolve => setTimeout(resolve, Game.ADD_CARD_DELAY));
    }

    get isInitialHand(): boolean {
        return this.hand.length <= 2;
    }

    // TODO
    checkBlackjack(): boolean {
        const card = this.hand[0];

        if((Rank.ACE === card.rank) || (card.dictionary.get(card.rank) === 10)) {
            // checking for blackjack...

            return this.blackjack;
        }

        return false;
    }
}