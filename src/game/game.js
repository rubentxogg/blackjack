import { Dealer } from "../dealer/dealer.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";
export class Game {
    constructor() {
        this.betInput = document.getElementById(this.bet.name);
        this.placeBetButton = document.getElementById(`place-${this.bet.name}`);
        this.hitButton = document.getElementById(this.hit.name);
        this.standButton = document.getElementById(this.stand.name);
        this.resultMessage = document.getElementById('result-message');
        this.DEALER_DELAY_MS = 4e2;
        this.NEW_ROUND_DELAY_MS = 15e2;
        this.dealer = new Dealer();
        this.player = new Player();
    }
    start() {
        this.newRound();
        this.initActions();
    }
    newRound() {
        Game.cardsDealt.length = 0;
        this.betInput.value = String(2);
        this.betInput.max = this.player.money.toString();
        this.dealer.clearHand();
        this.player.clearHand();
        this.updateButtons(false, false, [this.hitButton, this.standButton]);
        this.updateButtons(true, true, [this.placeBetButton]);
        this.betInput.focus();
    }
    dealCards() {
        [...Array(2)].forEach(() => {
            this.dealer.addCard();
            this.player.addCard();
        });
    }
    hit() {
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
    endRound() {
        let playerResult = null;
        if ((this.player.score <= Rules.BLACK_JACK) && ((this.player.score > this.dealer.score) || (this.dealer.score > Rules.BLACK_JACK))) {
            playerResult = this.player.win;
        }
        else if (this.player.score < this.dealer.score) {
            playerResult = this.player.bust;
        }
        else {
            playerResult = this.player.push;
        }
        this.player.refreshMoneyAfterResult(playerResult);
        this.setResultMessage(playerResult);
    }
    setResultMessage(resultFunc) {
        this.resultMessage.innerText = `${resultFunc.name}!`;
        this.resultMessage.className = `result-message-${resultFunc.name}`;
        setTimeout(() => {
            this.resultMessage.className = '';
        }, 15e2);
    }
    stand() {
        this.updateButtons(true, false, [this.hitButton, this.standButton]);
        this.dealer.flipCard();
        this.startDealersTurn();
    }
    startDealersTurn() {
        setTimeout(() => {
            if (this.dealer.score < Rules.DEALER_HIT_LIMIT) {
                this.dealer.addCard();
                return this.startDealersTurn();
            }
            this.endRound();
            setTimeout(() => this.newRound(), this.NEW_ROUND_DELAY_MS);
        }, this.DEALER_DELAY_MS);
    }
    bet() {
        this.player.placeBet();
        this.dealCards();
    }
    doubleDown() {
        // TODO
    }
    split() {
        // TODO
    }
    initActions() {
        this.updateButtons(false, false, [this.hitButton, this.standButton]);
        this.hitButton.addEventListener('click', () => this.hit());
        this.standButton.addEventListener('click', () => this.stand());
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
        this.placeBetButton.addEventListener('click', () => {
            this.bet();
            this.placeBetButton.style.display = 'none';
            this.updateButtons(true, true, [this.hitButton, this.standButton]);
        });
    }
    updateButtons(setVisible, setEnabled, buttons) {
        buttons.forEach(button => {
            button.style.display = setVisible ? '' : 'none';
            button.disabled = !setEnabled;
        });
    }
}
Game.cardsDealt = [];
