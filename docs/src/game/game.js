var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ActionButton } from "../action-button/action-button.js";
import { Dealer } from "../dealer/dealer.js";
import { Lang } from "../lang/lang.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";
export class Game {
    constructor() {
        this.playerInsuranceResponse = undefined;
        this.dealer = new Dealer();
        this.player = new Player();
        this.hitEnterKeyHandler = this.hitEnterKeyHandler.bind(this);
    }
    get chips() {
        const isVisible = (chipValue) => (ActionButton.placeBet.style.display !== 'none')
            && (!this.dealer.offerInsurance && (this.player.money >= Number(chipValue))
                || (this.dealer.offerInsurance && (Number(ActionButton.betInput.max) >= Number(chipValue))));
        const isDisabled = (chipValue) => ActionButton.placeBet.disabled
            || ((!this.dealer.offerInsurance && ((this.player.money - Number(ActionButton.betInput.value)) < Number(chipValue)))
                || (this.dealer.offerInsurance && ((Number(ActionButton.betInput.max) - Number(ActionButton.betInput.value)) < Number(chipValue))));
        return [
            { button: ActionButton.chip05, visible: isVisible(ActionButton.chip05.value), disabled: isDisabled(ActionButton.chip05.value) },
            { button: ActionButton.chip1, visible: isVisible(ActionButton.chip1.value), disabled: isDisabled(ActionButton.chip1.value) },
            { button: ActionButton.chip5, visible: isVisible(ActionButton.chip5.value), disabled: isDisabled(ActionButton.chip5.value) },
            { button: ActionButton.chip10, visible: isVisible(ActionButton.chip10.value), disabled: isDisabled(ActionButton.chip10.value) },
            { button: ActionButton.chip25, visible: isVisible(ActionButton.chip25.value), disabled: isDisabled(ActionButton.chip25.value) },
            { button: ActionButton.chip100, visible: isVisible(ActionButton.chip100.value), disabled: isDisabled(ActionButton.chip100.value) },
            { button: ActionButton.chip500, visible: isVisible(ActionButton.chip500.value), disabled: isDisabled(ActionButton.chip500.value) },
            { button: ActionButton.chip1k, visible: isVisible(ActionButton.chip1k.value), disabled: isDisabled(ActionButton.chip1k.value) },
            { button: ActionButton.chip5k, visible: isVisible(ActionButton.chip5k.value), disabled: isDisabled(ActionButton.chip5k.value) }
        ];
    }
    get betInputMin() {
        if (this.player.money % 1) {
            return String(0.5);
        }
        return !(this.player.money % 2) ? String(2) : String(1);
    }
    start() {
        Lang.translateAll();
        this.initEventListener();
        this.newRound();
    }
    askPlayerForInsurance() {
        return new Promise(resolve => { this.playerInsuranceResponse = resolve; });
    }
    newRound() {
        return __awaiter(this, void 0, void 0, function* () {
            Game.cardsDealt.length = 0;
            ActionButton.betInput.min = '0';
            ActionButton.betInput.value = '0';
            ActionButton.betInput.max = this.player.money.toString();
            ActionButton.update([
                { button: ActionButton.hit, visible: false, disabled: true },
                { button: ActionButton.stand, visible: false, disabled: true },
                { button: ActionButton.placeBet, visible: true, disabled: true },
                { button: ActionButton.doubleDown, visible: false, disabled: true },
                { button: ActionButton.allIn, visible: true, disabled: true },
                { button: ActionButton.reset, visible: true, disabled: true },
            ]);
            ActionButton.update([...this.chips]);
            yield Promise.all([
                this.dealer.clearHand(),
                this.player.clearHand()
            ]);
            ActionButton.update([
                { button: ActionButton.placeBet, visible: true, disabled: false },
                { button: ActionButton.allIn, visible: true, disabled: false },
                { button: ActionButton.reset, visible: true, disabled: false },
            ]);
            ActionButton.update([...this.chips]);
            ActionButton.placeBet.focus();
        });
    }
    dealCards() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.player.addCard();
            yield this.dealer.addCard();
            yield this.player.addCard();
            yield this.player.hasBlackjack();
            yield this.dealer.addCard();
            yield this.dealer.flipCard(0);
        });
    }
    hit() {
        return __awaiter(this, void 0, void 0, function* () {
            ActionButton.update([
                { button: ActionButton.hit, visible: true, disabled: true },
                { button: ActionButton.stand, visible: true, disabled: true },
                { button: ActionButton.doubleDown, visible: ActionButton.doubleDown.style.display !== 'none', disabled: true }
            ]);
            yield this.player.addCard();
            if (this.player.score > Rules.BLACKJACK) {
                this.player.displayResult(this.player.bust).then(() => this.newRound());
                return;
            }
            if ((this.player.score === Rules.BLACKJACK) || this.player.isDoublingDown) {
                this.stand();
                return;
            }
            ActionButton.update([
                { button: ActionButton.hit, visible: true, disabled: false },
                { button: ActionButton.stand, visible: true, disabled: false }
            ]);
            this.hitEnterKeyListener();
        });
    }
    endRound() {
        return __awaiter(this, void 0, void 0, function* () {
            let playerResult = null;
            const isInsuranceWin = this.player.isPlayingInsurance && this.dealer.blackjack;
            if (((this.player.score <= Rules.BLACKJACK) && ((this.player.score > this.dealer.score) || (this.dealer.score > Rules.BLACKJACK))) || isInsuranceWin) {
                playerResult = this.player.win;
            }
            else if (this.player.score < this.dealer.score) {
                playerResult = this.player.bust;
            }
            else {
                playerResult = this.player.push;
            }
            yield this.player.displayResult(playerResult);
        });
    }
    stand() {
        return __awaiter(this, void 0, void 0, function* () {
            ActionButton.update([
                { button: ActionButton.hit, visible: true, disabled: true },
                { button: ActionButton.stand, visible: true, disabled: true },
                { button: ActionButton.doubleDown, visible: this.player.isDoublingDown || this.player.canDoubleDown, disabled: true }
            ]);
            yield this.dealer.flipCard(1);
            this.startDealersTurn();
        });
    }
    startDealersTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dealer.score < Rules.DEALER_HIT_LIMIT) {
                yield this.dealer.addCard();
                return this.startDealersTurn();
            }
            this.endRound().then(() => this.newRound());
        });
    }
    bet(customBet) {
        return __awaiter(this, void 0, void 0, function* () {
            const bet = customBet !== null && customBet !== void 0 ? customBet : Number(ActionButton.betInput.value);
            if ((bet <= 0) || (bet > this.player.money) || (bet > Number(ActionButton.betInput.max))) {
                return;
            }
            this.player.placeBet(bet);
            ActionButton.update([
                { button: ActionButton.placeBet, visible: false, disabled: true },
                { button: ActionButton.allIn, visible: false, disabled: true },
                { button: ActionButton.reset, visible: false, disabled: true },
                { button: ActionButton.hit, visible: true, disabled: true },
                { button: ActionButton.stand, visible: true, disabled: true },
                { button: ActionButton.doubleDown, visible: this.player.canDoubleDown, disabled: true }
            ]);
            ActionButton.update([...this.chips]);
            yield this.dealCards();
            yield this.checkForInsurance();
            yield this.dealer.checkBlackjack();
            if (this.player.blackjack || this.dealer.blackjack) {
                return this.stand();
            }
            ActionButton.update([
                { button: ActionButton.hit, visible: true, disabled: false },
                { button: ActionButton.stand, visible: true, disabled: false },
                { button: ActionButton.doubleDown, visible: this.player.canDoubleDown, disabled: !this.player.canDoubleDown }
            ]);
            ActionButton.update([...this.chips]);
            this.hitEnterKeyListener();
        });
    }
    checkForInsurance() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const maxInsuranceBet = (Number(this.player.bet.toString()) / 2).toString();
            if (!this.dealer.offerInsurance || (this.player.money === 0) || (this.player.money < Number(maxInsuranceBet))) {
                return;
            }
            this.dealer.askForInsurance();
            ActionButton.betInput.min = '0';
            ActionButton.betInput.value = '0';
            ActionButton.betInput.max = maxInsuranceBet;
            ActionButton.update([
                { button: ActionButton.placeBet, visible: true, disabled: false },
                { button: ActionButton.allIn, visible: false, disabled: true },
                { button: ActionButton.reset, visible: true, disabled: false },
                { button: ActionButton.decline, visible: true, disabled: false },
                { button: ActionButton.hit, visible: false, disabled: true },
                { button: ActionButton.stand, visible: false, disabled: true },
                { button: ActionButton.doubleDown, visible: false, disabled: true }
            ]);
            ActionButton.update([...this.chips]);
            this.player.isPlayingInsurance = yield this.askPlayerForInsurance();
            if (this.player.isPlayingInsurance) {
                (_a = document.getElementById('dealer-message')) === null || _a === void 0 ? void 0 : _a.remove();
                ActionButton.update([
                    { button: ActionButton.placeBet, visible: false, disabled: true },
                    { button: ActionButton.reset, visible: false, disabled: true },
                    { button: ActionButton.hit, visible: true, disabled: true },
                    { button: ActionButton.stand, visible: true, disabled: true },
                    { button: ActionButton.doubleDown, visible: this.player.canDoubleDown, disabled: true },
                    { button: ActionButton.decline, visible: false, disabled: true }
                ]);
                ActionButton.update([...this.chips]);
                this.player.placeBet();
            }
        });
    }
    doubleDown() {
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
        this.declineListener();
        this.allInListener();
        this.resetBetListener();
    }
    resetBetListener() {
        ActionButton.reset.addEventListener('click', () => {
            ActionButton.ripple(ActionButton.reset);
            this.resetBet();
        });
        document.addEventListener('keydown', (event) => {
            if (!ActionButton.reset.disabled && (event.key.toLocaleLowerCase() === 'r')) {
                ActionButton.reset.click();
            }
        });
    }
    resetBet() {
        ActionButton.betInput.value = '0';
        ActionButton.update([...this.chips]);
    }
    allInListener() {
        ActionButton.allIn.addEventListener('click', () => {
            ActionButton.ripple(ActionButton.allIn);
            this.allIn();
        });
        document.addEventListener('keydown', (event) => {
            if (!ActionButton.allIn.disabled && (event.key.toLocaleLowerCase() === 'a')) {
                ActionButton.allIn.click();
            }
        });
    }
    allIn() {
        this.bet(this.player.money);
    }
    declineListener() {
        ActionButton.decline.addEventListener('click', () => {
            var _a;
            ActionButton.ripple(ActionButton.decline);
            (_a = document.getElementById('dealer-message')) === null || _a === void 0 ? void 0 : _a.remove();
            ActionButton.update([
                { button: ActionButton.placeBet, visible: false, disabled: true },
                { button: ActionButton.decline, visible: false, disabled: true },
                { button: ActionButton.hit, visible: true, disabled: true },
                { button: ActionButton.stand, visible: true, disabled: true },
                { button: ActionButton.doubleDown, visible: this.player.canDoubleDown, disabled: true }
            ]);
            ActionButton.update([...this.chips]);
            this.playerInsuranceResponse(false);
        });
        document.addEventListener('keydown', (event) => {
            if (ActionButton.decline.disabled) {
                return;
            }
            if (event.key === 'Backspace') {
                ActionButton.decline.click();
            }
        });
    }
    chipsListener() {
        this.chips.forEach(chipCfg => chipCfg.button.addEventListener('click', () => {
            ActionButton.ripple(chipCfg.button);
            ActionButton.betInput.value = (Number(ActionButton.betInput.value) + Number(chipCfg.button.value)).toString();
            ActionButton.update([...this.chips]);
        }));
    }
    doubleDownListener() {
        ActionButton.doubleDown.addEventListener('click', () => {
            ActionButton.ripple(ActionButton.doubleDown);
            this.doubleDown();
        });
        document.addEventListener('keydown', (event) => {
            if (!ActionButton.doubleDown.disabled && (event.key.toLocaleLowerCase() === 'd')) {
                ActionButton.doubleDown.click();
            }
        });
    }
    howToPlayListener() {
        ActionButton.howToPlayOpenButton.addEventListener('click', () => {
            ActionButton.ripple(ActionButton.howToPlayOpenButton);
            ActionButton.howToPlayDialog.showModal();
        });
        ActionButton.howToPlayCloseButton.addEventListener('click', () => ActionButton.howToPlayDialog.close());
    }
    standListener() {
        ActionButton.stand.addEventListener('click', () => {
            ActionButton.ripple(ActionButton.stand);
            this.stand();
        });
        document.addEventListener('keypress', (event) => {
            if (!ActionButton.stand.disabled && (event.key === ' ')) {
                ActionButton.stand.click();
            }
        });
    }
    betListener() {
        document.addEventListener('mouseover', () => {
            if (!ActionButton.placeBet.disabled) {
                ActionButton.placeBet.focus();
            }
        });
        ActionButton.placeBet.addEventListener('keydown', (event) => {
            event.preventDefault();
            if (event.key === 'Enter') {
                ActionButton.betInput.click();
            }
            else if ((event.key === 'ArrowUp') || (event.key.toLocaleLowerCase() === 'w')) {
                ActionButton.betInput.stepUp();
            }
            else if ((event.key === 'ArrowDown') || (event.key.toLocaleLowerCase() === 's')) {
                ActionButton.betInput.stepDown();
            }
            ActionButton.update([...this.chips]);
        });
        ActionButton.placeBet.addEventListener('blur', () => ActionButton.placeBet.focus());
        ActionButton.placeBet.addEventListener('focus', () => ActionButton.betInput.step = this.betInputMin);
        ActionButton.placeBet.addEventListener('wheel', (event) => {
            if (event.deltaY > 0) {
                ActionButton.betInput.stepDown();
            }
            else {
                ActionButton.betInput.stepUp();
            }
            ActionButton.update([...this.chips]);
        });
        ActionButton.placeBet.addEventListener('click', () => {
            ActionButton.ripple(ActionButton.placeBet);
            if (this.dealer.offerInsurance) {
                return this.playerInsuranceResponse(true);
            }
            this.bet();
        });
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
        if (!ActionButton.hit.disabled && (event.key === 'Enter')) {
            ActionButton.hit.click();
        }
    }
    hitListener() {
        ActionButton.hit.addEventListener('click', () => {
            document.removeEventListener('keypress', this.hitEnterKeyHandler, true);
            ActionButton.ripple(ActionButton.hit);
            this.hit();
        });
    }
}
Game.cardsDealt = [];
