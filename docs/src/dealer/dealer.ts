import { Card } from "../card/card.js";
import { Rank } from "../card/rank.enum.js";
import { Game } from "../game/game.constants.js";
import { Lang } from "../lang/lang.js";
import { Role } from "../role/role.js";


export class Dealer extends Role {

    protected addCardDelay = 1e3;

    constructor() {
        super(Dealer.name.toLocaleLowerCase());
    }

    get offerInsurance() {
        return (Rank.ACE === this.hand[0]?.rank);
    }

    private get hiddenCard(): HTMLImageElement {
        return document.querySelectorAll("[id$=hidden]")[0] as HTMLImageElement;
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

    async checkBlackjack(): Promise<boolean> {
        this.hiddenCard.style.opacity = '1';
        const card = this.hand[0];

        if ((Rank.ACE === card.rank) || (card.dictionary.get(card.rank) === 10)) {
            const checkMessage = document.createElement('span');

            checkMessage.textContent = Lang.data.dealer.checking;
            checkMessage.className = 'dealer-check';
            this.hiddenCard.style.opacity = '0.5';

            this.role.parentNode?.append(checkMessage);

            return new Promise(resolve => setTimeout(resolve, 3e3))
                .then(() => checkMessage.textContent = this.blackjack ? Lang.data.dealer.checked.blackjackYes : Lang.data.dealer.checked.blackjackNo)
                .then(() => new Promise(resolve => setTimeout(resolve, 3e3)))
                .then(() => this.role.parentNode?.removeChild(checkMessage))
                .then(() => this.hiddenCard.style.opacity = '1')
                .then(() => true)
        }

        return Promise.resolve(false);
    }

    askForInsurance(): boolean {
        if(!this.offerInsurance) {
            return false;
        }

        const checkMessage = document.createElement('span');

        checkMessage.id = 'dealer-message';
        checkMessage.textContent = Lang.data.dealer.insurance;
        checkMessage.className = 'dealer-check';
        this.hiddenCard.style.opacity = '0.5';
        this.role.parentNode?.append(checkMessage);

        return true;
    }
}