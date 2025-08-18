import { Card } from "../card/card.js";
import { Dealer } from "../dealer/dealer.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";

export class Game {
    private readonly dealer: Dealer;
    private readonly player: Player;
    static readonly cardsDealt: Card[] = [];
    private readonly betInput = document.getElementById(this.bet.name) as HTMLInputElement;
    private readonly doubleDownButton = document.getElementById('double-down') as HTMLButtonElement;
    private readonly howToPlayOpenButton = document.getElementById('open-how-to-play') as HTMLButtonElement;
    private readonly howToPlayDialog = document.getElementById('how-to-play-dialog') as HTMLDialogElement;
    private readonly howToPlayCloseButton = document.getElementById('close-how-to-play') as HTMLButtonElement;

    // Actions
    private readonly placeBetButton = document.getElementById(`place-${this.bet.name}`) as HTMLButtonElement;
    private readonly hitButton = document.getElementById(this.hit.name) as HTMLButtonElement;
    private readonly standButton = document.getElementById(this.stand.name) as HTMLButtonElement;

    // Betting chips
    private readonly chip1 = document.getElementById('chip-1') as HTMLButtonElement;
    private readonly chip5 = document.getElementById('chip-5') as HTMLButtonElement;
    private readonly chip10 = document.getElementById('chip-10') as HTMLButtonElement;
    private readonly chip25 = document.getElementById('chip-25') as HTMLButtonElement;
    private readonly chip100 = document.getElementById('chip-100') as HTMLButtonElement;
    private readonly chip500 = document.getElementById('chip-500') as HTMLButtonElement;
    private readonly chip1k = document.getElementById('chip-1k') as HTMLButtonElement;
    private readonly chip5k = document.getElementById('chip-5k') as HTMLButtonElement;

    constructor() {
        this.dealer = new Dealer();
        this.player = new Player();
        this.hitEnterKeyHandler = this.hitEnterKeyHandler.bind(this);
    }

    get chips(): ButtonConfig[] {
        const isVisible = (chipValue: string) => (this.placeBetButton.style.display !== 'none') && (this.player.money >= Number(chipValue));
        const isDisabled = (chipValue: string) => this.placeBetButton.disabled || ((this.player.money - Number(this.betInput.value)) < Number(chipValue));

        return [
            { button: this.chip1, visible: isVisible(this.chip1.value), disabled: isDisabled(this.chip1.value) },
            { button: this.chip5, visible: isVisible(this.chip5.value), disabled: isDisabled(this.chip5.value) },
            { button: this.chip10, visible: isVisible(this.chip10.value), disabled: isDisabled(this.chip10.value) },
            { button: this.chip25, visible: isVisible(this.chip25.value), disabled: isDisabled(this.chip25.value) },
            { button: this.chip100, visible: isVisible(this.chip100.value), disabled: isDisabled(this.chip100.value) },
            { button: this.chip500, visible: isVisible(this.chip500.value), disabled: isDisabled(this.chip500.value) },
            { button: this.chip1k, visible: isVisible(this.chip1k.value), disabled: isDisabled(this.chip1k.value) },
            { button: this.chip5k, visible: isVisible(this.chip5k.value), disabled: isDisabled(this.chip5k.value) }
        ];
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

        this.updateButtons([
            { button: this.hitButton, visible: false, disabled: true },
            { button: this.standButton, visible: false, disabled: true },
            { button: this.placeBetButton, visible: true, disabled: true },
            { button: this.doubleDownButton, visible: false, disabled: true },
        ]);
        this.updateButtons([...this.chips]);

        await Promise.all([
            this.dealer.clearHand(),
            this.player.clearHand()
        ]);

        this.updateButtons([
            { button: this.placeBetButton, visible: true, disabled: false },
        ]);
        this.updateButtons([...this.chips]);
        this.placeBetButton.focus();
    }

    private async dealCards(): Promise<void> {
        await this.player.addCard();
        await this.dealer.addCard();
        await this.player.addCard();
        await this.player.hasBlackjack();
        await this.dealer.addCard();
        await this.dealer.flipCard(0);
        await this.dealer.checkBlackjack();
    }

    private async hit(): Promise<void> {
        this.ripple(this.hitButton);

        this.updateButtons([
            { button: this.hitButton, visible: true, disabled: true },
            { button: this.standButton, visible: true, disabled: true },
            { button: this.doubleDownButton, visible: this.doubleDownButton.style.display !== 'none', disabled: true }
        ]);

        await this.player.addCard();

        if (this.player.score > Rules.BLACKJACK) {
            setTimeout(() => {
                this.player.displayResult(this.player.bust);
                setTimeout(() => this.newRound(), Rules.NEW_ROUND_DELAY_MS);
            }, Rules.ADD_CARD_DELAY);
            return;
        }

        if ((this.player.score === Rules.BLACKJACK) || this.player.isDoublingDown) {
            this.stand();
            return;
        }

        this.updateButtons([
            { button: this.hitButton, visible: true, disabled: false },
            { button: this.standButton, visible: true, disabled: false }
        ]);

        this.hitEnterKeyListener();
    }

    private ripple(button: HTMLButtonElement): void {
        button.classList.add('ripple');
        setTimeout(() => button.classList.remove('ripple'), 200);
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

    private async stand(): Promise<void> {
        this.ripple(this.standButton);

        this.updateButtons([
            { button: this.hitButton, visible: true, disabled: true },
            { button: this.standButton, visible: true, disabled: true },
            { button: this.doubleDownButton, visible: this.player.isDoublingDown || this.player.canDoubleDown, disabled: true }
        ]);

        await this.dealer.flipCard(1);
        this.startDealersTurn();
    }

    private async startDealersTurn(): Promise<void> {
        if (this.dealer.score < Rules.DEALER_HIT_LIMIT) {
            await this.dealer.addCard();
            return this.startDealersTurn();
        }

        this.endRound();
        setTimeout(() => this.newRound(), Rules.NEW_ROUND_DELAY_MS);
    }

    private async bet(): Promise<void> {
        if (Number(this.betInput.value) > this.player.money) {
            return;
        }

        this.player.placeBet();

        this.updateButtons([
            { button: this.placeBetButton, visible: false, disabled: true },
            { button: this.hitButton, visible: true, disabled: true },
            { button: this.standButton, visible: true, disabled: true },
            { button: this.doubleDownButton, visible: this.player.canDoubleDown, disabled: true }
        ]);
        this.updateButtons([...this.chips]);
        await this.dealCards();

        if (this.player.blackjack || this.dealer.blackjack) {
            this.stand();
        }

        this.updateButtons([
            { button: this.hitButton, visible: true, disabled: false },
            { button: this.standButton, visible: true, disabled: false },
            { button: this.doubleDownButton, visible: this.player.canDoubleDown, disabled: !this.player.canDoubleDown }
        ]);
        this.updateButtons([...this.chips]);
        this.hitEnterKeyListener();
    }

    private doubleDown(): void {
        this.ripple(this.doubleDownButton);
        this.player.doubleDown();
        this.hit();
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
        this.chipsListener();
    }

    private chipsListener(): void {
        this.chips.forEach(chipCfg => chipCfg.button.addEventListener('click', () => {
            this.ripple(chipCfg.button);
            this.betInput.value = (Number(this.betInput.value) + Number(chipCfg.button.value)).toString();
            this.updateButtons([...this.chips]);
        }));
    }

    private doubleDownListener(): void {
        this.doubleDownButton.addEventListener('click', () => this.doubleDown());

        document.addEventListener('keydown', (event) => {
            if (!this.doubleDownButton.disabled && (event.key.toLocaleLowerCase() === 'd')) {
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
            } else if ((event.key === 'ArrowUp') || (event.key.toLocaleLowerCase() === 'w')) {
                this.betInput.stepUp();
            } else if ((event.key === 'ArrowDown') || (event.key.toLocaleLowerCase() === 's')) {
                this.betInput.stepDown();
            }

            this.updateButtons([...this.chips]);
        });

        this.placeBetButton.addEventListener('blur', () => this.placeBetButton.focus());
        this.placeBetButton.addEventListener('focus', () => this.betInput.step = this.betInputMin);
        this.placeBetButton.addEventListener('wheel', (event) => {
            if (event.deltaY > 0) {
                this.betInput.stepDown()
            } else {
                this.betInput.stepUp()
            }
            this.updateButtons([...this.chips]);
        });
        this.placeBetButton.addEventListener('click', () => this.bet());
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

    private updateButtons(config: ButtonConfig[]): void {
        config.forEach(cfg => {
            cfg.button.style.display = cfg.visible ? 'block' : 'none';
            cfg.button.disabled = cfg.disabled;
        });
    }
}