var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Dealer } from "../dealer/dealer.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";
export class Game {
    constructor() {
        this.betInput = document.getElementById(this.bet.name);
        this.doubleDownButton = document.getElementById('double-down');
        this.howToPlayOpenButton = document.getElementById('open-how-to-play');
        this.howToPlayDialog = document.getElementById('how-to-play-dialog');
        this.howToPlayCloseButton = document.getElementById('close-how-to-play');
        // Actions
        this.placeBetButton = document.getElementById(`place-${this.bet.name}`);
        this.hitButton = document.getElementById(this.hit.name);
        this.standButton = document.getElementById(this.stand.name);
        // Bet chips
        this.chipOne = document.getElementById('chip-1');
        this.chipFive = document.getElementById('chip-5');
        this.chipTwentyFive = document.getElementById('chip-25');
        this.chipHundred = document.getElementById('chip-100');
        this.chipFiveHundred = document.getElementById('chip-500');
        this.dealer = new Dealer();
        this.player = new Player();
        this.hitEnterKeyHandler = this.hitEnterKeyHandler.bind(this);
    }
    get chips() {
        const isPlaceBetButtonVisible = this.placeBetButton.style.display !== 'none';
        const isDisabled = (chipValue) => this.placeBetButton.disabled || ((this.player.money - Number(this.betInput.value)) < chipValue);
        return [
            { button: this.chipOne, visible: isPlaceBetButtonVisible, disabled: isDisabled(Number(this.chipOne.innerText)) },
            { button: this.chipFive, visible: isPlaceBetButtonVisible, disabled: isDisabled(Number(this.chipFive.innerText)) },
            { button: this.chipTwentyFive, visible: isPlaceBetButtonVisible, disabled: isDisabled(Number(this.chipTwentyFive.innerText)) },
            { button: this.chipHundred, visible: isPlaceBetButtonVisible, disabled: isDisabled(Number(this.chipHundred.innerText)) },
            { button: this.chipFiveHundred, visible: isPlaceBetButtonVisible, disabled: isDisabled(Number(this.chipFiveHundred.innerText)) }
        ];
    }
    get betInputMin() {
        if (this.player.money % 1) {
            return String(0.5);
        }
        return !(this.player.money % 2) ? String(2) : String(1);
    }
    start() {
        this.initEventListener();
        this.newRound();
    }
    newRound() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield Promise.all([
                this.dealer.clearHand(),
                this.player.clearHand()
            ]);
            this.updateButtons([
                { button: this.placeBetButton, visible: true, disabled: false },
            ]);
            this.updateButtons([...this.chips]);
            this.placeBetButton.focus();
        });
    }
    dealCards() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.player.addCard();
            yield this.dealer.addCard();
            yield this.player.addCard();
            yield this.dealer.addCard();
        });
    }
    hit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.ripple(this.hitButton);
            this.updateButtons([
                { button: this.hitButton, visible: true, disabled: true },
                { button: this.standButton, visible: true, disabled: true },
                { button: this.doubleDownButton, visible: this.doubleDownButton.style.display !== 'none', disabled: true }
            ]);
            yield this.player.addCard();
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
        });
    }
    ripple(button) {
        button.classList.add('ripple');
        setTimeout(() => button.classList.remove('ripple'), 500);
    }
    endRound() {
        let playerResult = null;
        if ((this.player.score <= Rules.BLACKJACK) && ((this.player.score > this.dealer.score) || (this.dealer.score > Rules.BLACKJACK))) {
            playerResult = this.player.win;
        }
        else if (this.player.score < this.dealer.score) {
            playerResult = this.player.bust;
        }
        else {
            playerResult = this.player.push;
        }
        this.player.displayResult(playerResult);
    }
    stand() {
        return __awaiter(this, void 0, void 0, function* () {
            this.ripple(this.standButton);
            this.updateButtons([
                { button: this.hitButton, visible: true, disabled: true },
                { button: this.standButton, visible: true, disabled: true },
                { button: this.doubleDownButton, visible: this.player.isDoublingDown || this.player.canDoubleDown, disabled: true }
            ]);
            yield this.dealer.flipCard();
            this.startDealersTurn();
        });
    }
    startDealersTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dealer.score < Rules.DEALER_HIT_LIMIT) {
                yield this.dealer.addCard();
                return this.startDealersTurn();
            }
            this.endRound();
            setTimeout(() => this.newRound(), Rules.NEW_ROUND_DELAY_MS);
        });
    }
    bet() {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.placeBet();
            this.updateButtons([
                { button: this.placeBetButton, visible: false, disabled: true },
                { button: this.hitButton, visible: true, disabled: true },
                { button: this.standButton, visible: true, disabled: true },
                { button: this.doubleDownButton, visible: this.player.canDoubleDown, disabled: true }
            ]);
            this.updateButtons([...this.chips]);
            this.hitEnterKeyListener();
            yield this.dealCards();
            if (this.player.hasBlackjack()) {
                return yield new Promise(resolve => setTimeout(resolve, 3e3)).then(() => this.stand());
            }
            this.updateButtons([
                { button: this.hitButton, visible: true, disabled: false },
                { button: this.standButton, visible: true, disabled: false },
                { button: this.doubleDownButton, visible: this.player.canDoubleDown, disabled: !this.player.canDoubleDown }
            ]);
            this.updateButtons([
                ...this.chips
            ]);
        });
    }
    doubleDown() {
        this.ripple(this.doubleDownButton);
        this.player.doubleDown();
        this.hit();
    }
    split() {
        // TODO
    }
    initEventListener() {
        this.howToPlayListener();
        this.hitListener();
        this.standListener();
        this.betListener();
        this.doubleDownListener();
        this.chipsListener();
    }
    chipsListener() {
        this.chips.forEach(chipCfg => chipCfg.button.addEventListener('click', () => {
            this.betInput.value = (Number(this.betInput.value) + Number(chipCfg.button.innerText)).toString();
            this.updateButtons([...this.chips]);
        }));
    }
    doubleDownListener() {
        this.doubleDownButton.addEventListener('click', () => this.doubleDown());
        document.addEventListener('keydown', (event) => {
            if (!this.doubleDownButton.disabled && (event.key.toLocaleLowerCase() === 'd')) {
                this.doubleDown();
            }
        });
    }
    howToPlayListener() {
        this.howToPlayOpenButton.addEventListener('click', () => {
            this.ripple(this.howToPlayOpenButton);
            this.howToPlayDialog.showModal();
        });
        this.howToPlayCloseButton.addEventListener('click', () => this.howToPlayDialog.close());
    }
    standListener() {
        this.standButton.addEventListener('click', () => this.stand());
        document.addEventListener('keypress', (event) => {
            if (!this.standButton.disabled && (event.key === ' ')) {
                this.stand();
            }
        });
    }
    betListener() {
        document.addEventListener('mouseover', () => {
            if (!this.placeBetButton.disabled) {
                this.placeBetButton.focus();
            }
        });
        this.placeBetButton.addEventListener('keydown', (event) => {
            event.preventDefault();
            if (event.key === 'Enter') {
                this.betInput.click();
            }
            else if ((event.key === 'ArrowUp') || (event.key.toLocaleLowerCase() === 'w')) {
                this.betInput.stepUp();
            }
            else if ((event.key === 'ArrowDown') || (event.key.toLocaleLowerCase() === 's')) {
                this.betInput.stepDown();
            }
            this.updateButtons([...this.chips]);
        });
        this.placeBetButton.addEventListener('blur', () => this.placeBetButton.focus());
        this.placeBetButton.addEventListener('focus', () => this.betInput.step = this.betInputMin);
        this.placeBetButton.addEventListener('wheel', (event) => {
            if (event.deltaY > 0) {
                this.betInput.stepDown();
            }
            else {
                this.betInput.stepUp();
            }
            this.updateButtons([...this.chips]);
        });
        this.placeBetButton.addEventListener('click', () => this.bet());
    }
    /**
     * Allow to use the 'Enter' key to hit after placing a bet
     */
    hitEnterKeyListener() {
        setTimeout(() => {
            document.addEventListener('keypress', this.hitEnterKeyHandler, true);
        });
    }
    hitEnterKeyHandler(event) {
        if (!this.hitButton.disabled && (event.key === 'Enter')) {
            this.hit();
        }
    }
    hitListener() {
        this.hitButton.addEventListener('click', () => {
            document.removeEventListener('keypress', this.hitEnterKeyHandler, true);
            this.hit();
        });
    }
    updateButtons(config) {
        config.forEach(cfg => {
            cfg.button.style.display = cfg.visible ? 'block' : 'none';
            cfg.button.disabled = cfg.disabled;
        });
    }
}
Game.cardsDealt = [];
