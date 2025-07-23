import { Card } from "../card/card.js";
import { Dealer } from "../dealer/dealer.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";

export class Game {
    private readonly dealer: Dealer;
    private readonly player: Player;
    static readonly cardsDealt: Card[] = [];

    constructor() {
        this.dealer = new Dealer();
        this.player = new Player();
    }

    start() {
        this.player.drawMoney();
        this.initActions();
    }

    private newRound(): void {
        Game.cardsDealt.length = 0;
        this.dealer.clearHand();
        this.player.clearHand();
    }

    private dealCards(): void {
        [...Array(2)].forEach(() => {
            this.dealer.addCard();
            this.player.addCard();
        });
    }

    private hit(): void {
        this.player.addCard();
        
        if ((this.player.score > Rules.BLACK_JACK)) {
            this.player.lose();
            this.newRound();
        }
    }

    private endRound(): void {
        if((this.dealer.score > Rules.BLACK_JACK) || (this.player.score > this.dealer.score)) {
            this.player.win();
        } else if(this.dealer.score === this.player.score) {
            this.player.draw();
        } else {
            this.player.lose();
        }
    }

    private stand(): void {
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

    private bet(): void {
        this.player.placeBet().then(() => this.dealCards());
    }

    private doubleDown(): void {
        // TODO
    }

    private split(): void {
        // TODO
    }

    private initActions(): void {
        const EVENT = {
            CLICK: 'click',
        };

        const hit = document.getElementById(this.hit.name) as HTMLInputElement;
        const stand = document.getElementById(this.stand.name) as HTMLInputElement;

        hit.addEventListener(EVENT.CLICK, () => this.hit());
        stand.addEventListener(EVENT.CLICK, () => this.stand());

        const bet = document.getElementById(`place-${this.bet.name}`) as HTMLInputElement;

        bet.addEventListener(EVENT.CLICK, (event) => {
            if (event.currentTarget === event.target) {
                this.bet();
            }
        });
    }
}