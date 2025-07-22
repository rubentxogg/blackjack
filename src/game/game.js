import { Dealer } from "../dealer/dealer.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";
export class Game {
    constructor() {
        this.cardsDealt = [];
        this.dealer = new Dealer();
        this.player = new Player();
    }
    start() {
        this.player.drawMoney();
        this.initActions();
    }
    newRound() {
        this.cardsDealt = [];
        this.dealer.clearHand();
        this.player.clearHand();
    }
    dealCards() {
        [...Array(2)].forEach(() => {
            this.dealer.addCard(this.cardsDealt);
            this.player.addCard(this.cardsDealt);
        });
    }
    hit() {
        this.player.addCard(this.cardsDealt);
        if ((this.player.score > Rules.BLACK_JACK)) {
            this.player.lose();
            this.newRound();
        }
    }
    endRound() {
        if ((this.dealer.score > Rules.BLACK_JACK) || (this.player.score > this.dealer.score)) {
            this.player.win();
        }
        else if (this.dealer.score === this.player.score) {
            this.player.draw();
        }
        else {
            this.player.lose();
        }
        this.newRound();
    }
    stand() {
        while (Rules.DEALER_HIT_LIMIT > this.dealer.score) {
            this.dealer.addCard(this.cardsDealt);
        }
        this.endRound();
    }
    bet() {
        this.player.placeBet().then(() => this.dealCards());
    }
    doubleDown() {
        // TODO
    }
    split() {
        // TODO
    }
    initActions() {
        const EVENT = {
            CLICK: 'click',
        };
        const hit = document.getElementById(this.hit.name);
        const stand = document.getElementById(this.stand.name);
        hit.addEventListener(EVENT.CLICK, () => this.hit());
        stand.addEventListener(EVENT.CLICK, () => this.stand());
        const bet = document.getElementById(`place-${this.bet.name}`);
        bet.addEventListener(EVENT.CLICK, (event) => {
            if (event.currentTarget === event.target) {
                this.bet();
            }
        });
    }
}
