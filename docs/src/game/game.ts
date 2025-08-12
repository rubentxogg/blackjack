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
    private readonly doubleDownButton = document.getElementById('double-down') as HTMLButtonElement;
    private readonly howToPlayOpenButton = document.getElementById('open-how-to-play') as HTMLButtonElement;
    private readonly howToPlayDialog = document.getElementById('how-to-play-dialog') as HTMLDialogElement;
    private readonly howToPlayCloseButton = document.getElementById('close-how-to-play') as HTMLButtonElement;
    private readonly DEALER_DELAY_MS = 4e2;
    private readonly NEW_ROUND_DELAY_MS = 3e3;

    constructor() {
        this.dealer = new Dealer();
        this.player = new Player();
        this.hitEnterKeyHandler = this.hitEnterKeyHandler.bind(this);
    }

    get betInputMin(): string {
        if (this.player.money % 1) {
            return String(0.5);
        }

        return !(this.player.money % 2) ? String(2) : String(1);
    }

    start(): void {
        this.initEventListener();
        this.newRound();
    }

    private async newRound(): Promise<void> {
        Game.cardsDealt.length = 0;
        this.betInput.min = this.betInputMin;
        this.betInput.value = this.betInput.min;
        this.betInput.max = this.player.money.toString();

        this.updateButtons(false, false, [this.hitButton, this.standButton, this.doubleDownButton]);
        this.updateButtons(true, false, [this.placeBetButton]);

        await Promise.all([
            this.dealer.clearHand(),
            this.player.clearHand()
        ]);

        this.updateButtons(true, true, [this.placeBetButton]);
        this.placeBetButton.focus();
    }

    private dealCards(): void {
        [...Array(2)].forEach(() => {
            this.dealer.addCard();
            this.player.addCard();
        });
    }

    private hit(): void {
        this.ripple(this.hitButton);
        const buttons = [this.hitButton, this.standButton];

        this.updateButtons(true, false, [...buttons, this.doubleDownButton]);
        this.player.addCard();

        if (this.player.score > Rules.BLACKJACK) {
            setTimeout(() => {
                this.player.displayResult(this.player.bust);
                setTimeout(() => this.newRound(), this.NEW_ROUND_DELAY_MS);
            }, 500);
            return;
        }

        if (this.player.score === Rules.BLACKJACK) {
            this.stand();
            return;
        }

        this.updateButtons(true, true, buttons);
        this.hitEnterKeyListener();
    }

    private ripple(button: HTMLButtonElement): void {
        button.classList.add('ripple');
        setTimeout(() => button.classList.remove('ripple'), 500);
    }

    private endRound(): void {
        let playerResult = null;

        if ((this.player.score <= Rules.BLACKJACK) && ((this.player.score > this.dealer.score) || (this.dealer.score > Rules.BLACKJACK))) {
            playerResult = this.player.win;
        } else if (this.player.score < this.dealer.score) {
            playerResult = this.player.bust;
        } else {
            playerResult = this.player.push;
        }

        this.player.displayResult(playerResult);
    }

    private stand(): void {
        this.ripple(this.standButton);
        this.updateButtons(true, false, [this.hitButton, this.standButton, this.doubleDownButton]);
        this.dealer.flipCard();
        setTimeout(() => this.startDealersTurn(), 500);
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
        this.ripple(this.doubleDownButton);
    }

    private split(): void {
        // TODO
    }

    private initEventListener(): void {
        this.howToPlayListener();
        this.hitListener();
        this.standListener();
        this.betListener();
        this.doubleDownListener();
    }

    private doubleDownListener(): void {
        this.doubleDownButton.addEventListener('click', () => this.doubleDown());

        document.addEventListener('keydown', (event) => {
            if(!this.doubleDownButton.disabled && (event.key.toLocaleLowerCase() === 'd')) {
                this.doubleDown();
            }
        });
    }

    private howToPlayListener(): void {
        this.howToPlayOpenButton.addEventListener('click', () => {
            this.ripple(this.howToPlayOpenButton);
            this.howToPlayDialog.showModal();
        });

        this.howToPlayCloseButton.addEventListener('click', () => this.howToPlayDialog.close());
    }

    private standListener(): void {
        this.standButton.addEventListener('click', () => this.stand());

        document.addEventListener('keypress', (event) => {
            if (!this.standButton.disabled && (event.key === ' ')) {
                this.stand();
            }
        });
    }

    private betListener(): void {
        document.addEventListener('mouseover', () => {
            if (!this.placeBetButton.disabled) {
                this.placeBetButton.focus();
            }
        });

        this.placeBetButton.addEventListener('keydown', (event) => {
            event.preventDefault();

            if (event.key === 'Enter') {
                this.betInput.click();
                return;
            }

            if ((event.key === 'ArrowUp') || (event.key.toLocaleLowerCase() === 'w')) {
                this.betInput.stepUp();
                return;
            }

            if ((event.key === 'ArrowDown') || (event.key.toLocaleLowerCase() === 's')) {
                this.betInput.stepDown();
            }
        });

        this.placeBetButton.addEventListener('blur', () => this.placeBetButton.focus());
        this.placeBetButton.addEventListener('focus', () => this.betInput.step = this.betInputMin);
        this.placeBetButton.addEventListener('wheel', (event) => (event.deltaY > 0) ? this.betInput.stepDown() : this.betInput.stepUp());
        this.placeBetButton.addEventListener('click', async () => {
            this.hitEnterKeyListener();
            this.bet();
            this.updateButtons(false, false, [this.placeBetButton]);

            const actionButtons = [this.hitButton, this.standButton, this.doubleDownButton];

            if (this.player.hasBlackjack()) {
                this.updateButtons(true, false, actionButtons);
                return await new Promise(resolve => setTimeout(resolve, 3e3)).then(() => this.stand());
            }

            this.updateButtons(true, true, actionButtons);
        });
    }

    /**
     * Allow to use the 'Enter' key to hit after placing a bet
     */
    private hitEnterKeyListener(): void {
        setTimeout(() => {
            document.addEventListener('keypress', this.hitEnterKeyHandler, true,)
        });
    }

    private hitEnterKeyHandler(event: KeyboardEvent) {
        if (!this.hitButton.disabled && (event.key === 'Enter')) {
            this.hit();
        }
    }

    private hitListener(): any {
        this.hitButton.addEventListener('click', () => {
            document.removeEventListener('keypress', this.hitEnterKeyHandler, true);
            this.hit();
        });
    }

    private updateButtons(setVisible: boolean, setEnabled: boolean, buttons: HTMLButtonElement[]): void {
        buttons.forEach(button => {
            button.style.display = setVisible ? 'block' : 'none';
            button.disabled = !setEnabled;
        });
    }
}