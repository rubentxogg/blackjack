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
    private readonly TIME_MS = 3e2;

    constructor() {
        this.dealer = new Dealer();
        this.player = new Player();
    }

    start() {
        this.newRound();
        this.initActions();
    }

    private newRound(): void {
        Game.cardsDealt.length = 0;
        this.betInput.value = String(2);
        this.betInput.max = this.player.money.toString();
        this.dealer.clearHand();
        this.player.clearHand();
        this.hitButton.style.display = 'none';
        this.standButton.style.display = 'none';
        this.placeBetButton.style.display = '';
    }

    private dealCards(): void {
        [...Array(2)].forEach(() => {
            this.dealer.addCard();
            this.player.addCard();
        });
    }

    private hit(): void {
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.player.addCard();

        setTimeout(() => {
            if (this.player.score > Rules.BLACK_JACK) {
                this.player.refreshMoneyAfterResult(this.player.lose);
                this.newRound();
            } else if (this.player.score === Rules.BLACK_JACK) {
                this.stand();
            } else {
                this.hitButton.disabled = false;
                this.standButton.disabled = false;
            }
        }, this.TIME_MS);
    }

    private endRound(): void {
        let playerResult = null;

        if ((this.player.score <= Rules.BLACK_JACK) && ((this.player.score > this.dealer.score) || (this.dealer.score > Rules.BLACK_JACK))) {
            playerResult = this.player.win;
        } else if (this.player.score < this.dealer.score) {
            playerResult = this.player.lose;
        } else {
            playerResult = this.player.draw;
        }

        this.player.refreshMoneyAfterResult(playerResult);
    }

    private stand(): void {
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.dealer.flipCard();
        this.checkDealersTurn();
    }

    private checkDealersTurn() {
        setTimeout(() => {
            if (this.dealer.score < Rules.DEALER_HIT_LIMIT) {
                this.dealer.addCard();
                this.checkDealersTurn();
            } else {
                setTimeout(() => {
                    this.endRound();
                    setTimeout(() => this.newRound(), this.TIME_MS);
                }, this.TIME_MS);
            }
        }, this.TIME_MS);
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

    private initActions(): void {
        this.betInput.addEventListener('keypress', (event) => event.preventDefault());
        this.hitButton.style.display = 'none';
        this.standButton.style.display = 'none';

        this.placeBetButton.addEventListener('click', (event) => {
            if (event.currentTarget !== event.target) {
                return;
            }

            this.bet();
            this.placeBetButton.style.display = 'none';
            this.hitButton.style.display = '';
            this.hitButton.disabled = false;
            this.standButton.style.display = '';
            this.standButton.disabled = false;
        });

        this.hitButton.addEventListener('click', () => this.hit());
        this.standButton.addEventListener('click', () => this.stand());
    }
}