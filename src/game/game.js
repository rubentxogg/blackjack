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
        this.newRound();
        this.initActions();
    }
    newRound() {
        this.cardsDealt = [];
        this.dealer.hand = [];
        this.player.hand = [];
    }
    dealCards() {
        [...Array(2)].forEach(() => {
            this.dealer.addCard(this.cardsDealt);
            this.player.addCard(this.cardsDealt);
        });
    }
    hit() {
        this.player.addCard(this.cardsDealt);
        this.checkScore();
    }
    checkScore() {
        // TODO
        if (this.player.score > Rules.BLACK_JACK) {
            console.log("The player loses");
        }
        else if (this.player.score === Rules.BLACK_JACK) {
            console.log("BLACK JACK");
            this.player.money = this.player.bet * Rules.ODDS;
        }
        else if ((this.dealer.score <= Rules.BLACK_JACK) && (this.dealer.score > this.player.score)) {
            console.log("The player loses");
        }
        else {
            console.log("The player wins");
        }
    }
    stand() {
        while (Rules.DEALER_HIT_LIMIT > this.dealer.score) {
            this.dealer.addCard(this.cardsDealt);
        }
        this.checkScore();
    }
    bet() {
        const bet = document.getElementById('bet').value;
        this.player.placeBet(Number.parseInt(bet)).then(() => this.dealCards());
    }
    doubleDown() {
        // TODO
    }
    split() {
        // TODO
    }
    initActions() {
        const EVENT = {
            CLICK: 'click'
        };
        const hitElement = document.getElementById(this.hit.name);
        const standElement = document.getElementById(this.stand.name);
        const betElement = document.getElementById(`place-${this.bet.name}`);
        hitElement === null || hitElement === void 0 ? void 0 : hitElement.addEventListener(EVENT.CLICK, () => this.hit());
        standElement === null || standElement === void 0 ? void 0 : standElement.addEventListener(EVENT.CLICK, () => this.stand());
        betElement === null || betElement === void 0 ? void 0 : betElement.addEventListener(EVENT.CLICK, (event) => {
            if (event.currentTarget === event.target) {
                this.bet();
            }
        });
    }
}
