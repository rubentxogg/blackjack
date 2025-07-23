import { Dealer } from "../dealer/dealer.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";
export class Game {
    constructor() {
        this.dealer = new Dealer();
        this.player = new Player();
    }
    start() {
        this.player.drawMoney();
        this.initActions();
    }
    newRound() {
        Game.cardsDealt.length = 0;
        this.dealer.clearHand();
        this.player.clearHand();
    }
    dealCards() {
        [...Array(2)].forEach(() => {
            this.dealer.addCard();
            this.player.addCard();
        });
    }
    hit() {
        this.player.addCard();
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
    }
    stand() {
        this.dealer.flipCard();
        while (this.dealer.score < Rules.DEALER_HIT_LIMIT) {
            this.dealer.addCard();
        }
        setTimeout(() => {
            this.endRound();
        }, 3e3);
        setTimeout(() => {
            this.newRound();
        }, 3e3);
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
Game.cardsDealt = [];
