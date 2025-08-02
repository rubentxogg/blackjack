import { Card } from "../card/card.js";
import { Dealer } from "../dealer/dealer.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";

export class Game {
    private readonly dealer: Dealer;
    private readonly player: Player;
    static readonly cardsDealt: Card[] = [];
    private readonly betInput = document.getElementById(this.bet.name) as HTMLInputElement;
    private readonly placeBetButton = document.getElementById(`place-${this.bet.name}`) as HTMLButtonElement;
    private readonly hitButton = document.getElementById(this.hit.name) as HTMLButtonElement;
    private readonly standButton = document.getElementById(this.stand.name) as HTMLButtonElement;
    private readonly resultMessage = document.getElementById('result-message') as HTMLSpanElement;
    private readonly DEALER_DELAY_MS = 4e2;
    private readonly NEW_ROUND_DELAY_MS = 15e2;

    constructor() {
        this.dealer = new Dealer();
        this.player = new Player();
    }

    start(): void {
        this.initEventListener();
        this.newRound();
    }

    private newRound(): void {
        Game.cardsDealt.length = 0;
        this.betInput.value = String(2);
        this.betInput.max = this.player.money.toString();

        this.dealer.clearHand();
        this.player.clearHand();
        this.updateButtons(false, false, [this.hitButton, this.standButton]);
        this.updateButtons(true, true, [this.placeBetButton]);
        this.betInput.focus();
    }

    private dealCards(): void {
        [...Array(2)].forEach(() => {
            this.dealer.addCard();
            this.player.addCard();
        });
    }

    private hit(): void {
        const buttons = [this.hitButton, this.standButton];

        this.updateButtons(true, false, buttons);
        this.player.addCard();

        if (this.player.score > Rules.BLACK_JACK) {
            this.player.refreshMoneyAfterResult(this.player.bust);
            this.setResultMessage(this.player.bust);
            setTimeout(() => this.newRound(), this.NEW_ROUND_DELAY_MS);
            return;
        }

        if (this.player.score === Rules.BLACK_JACK) {
            this.stand();
            return;
        }

        this.updateButtons(true, true, buttons);
    }

    private endRound(): void {
        let playerResult = null;

        if ((this.player.score <= Rules.BLACK_JACK) && ((this.player.score > this.dealer.score) || (this.dealer.score > Rules.BLACK_JACK))) {
            playerResult = this.player.win;
        } else if (this.player.score < this.dealer.score) {
            playerResult = this.player.bust;
        } else {
            playerResult = this.player.push;
        }

        this.player.refreshMoneyAfterResult(playerResult);
        this.setResultMessage(playerResult);
    }

    private setResultMessage(resultFunc: Function): void {
        this.resultMessage.innerText = `${resultFunc.name}!`;
        this.resultMessage.className = `result-message-${resultFunc.name}`;

        setTimeout(() => {
            this.resultMessage.className = '';
        }, 15e2);
    }

    private stand(): void {
        this.updateButtons(true, false, [this.hitButton, this.standButton]);
        this.dealer.flipCard();
        this.startDealersTurn();
    }

    private startDealersTurn(): void {
        setTimeout(() => {
            if (this.dealer.score < Rules.DEALER_HIT_LIMIT) {
                this.dealer.addCard();
                return this.startDealersTurn();
            }

            this.endRound();
            setTimeout(() => this.newRound(), this.NEW_ROUND_DELAY_MS);
        }, this.DEALER_DELAY_MS);
    }

    private bet(): void {
        this.player.placeBet();
        this.dealCards();
    }

    private doubleDown(): void {
        // TODO
    }

    private split(): void {
        // TODO
    }

    private initEventListener(): void {
        this.hitListener();
        this.standListener();
        this.betListener();
    }

    private standListener(): void {
        this.standButton.addEventListener('click', () => this.stand());
    }

    private betListener(): void {
        this.betInput.addEventListener('keypress', (event) => {
            event.preventDefault();

            if (event.key === 'Enter') {
                this.betInput.click();
                return;
            }

            if (event.key.toLocaleLowerCase() === 'w') {
                this.betInput.stepUp();
                return;
            }

            if (event.key.toLocaleLowerCase() === 's') {
                this.betInput.stepDown();
            }
        });

        this.betInput.addEventListener('change', () => this.betInput.step = (this.player.money % 2 === 0) ? String(2) : String(1));
        this.betInput.addEventListener('blur', () => this.betInput.focus());
        this.placeBetButton.addEventListener('wheel', (event) => (event.deltaY > 0) ? this.betInput.stepDown() : this.betInput.stepUp());

        this.placeBetButton.addEventListener('click', () => {
            this.bet();
            this.placeBetButton.style.display = 'none';
            this.updateButtons(true, true, [this.hitButton, this.standButton]);
        });
    }

    private hitListener(): void {
        this.hitButton.addEventListener('click', () => this.hit());
    }

    private updateButtons(setVisible: boolean, setEnabled: boolean, buttons: HTMLButtonElement[]): void {
        buttons.forEach(button => {
            button.style.display = setVisible ? '' : 'none';
            button.disabled = !setEnabled;
        });
    }
}