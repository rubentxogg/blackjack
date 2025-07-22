import { Card } from "../card/card.js";
import { Dealer } from "../dealer/dealer.js";
import { Player } from "../player/player.js";
import { Game as Rules } from "./game.constants.js";

export class Game {
    private readonly dealer: Dealer;
    private readonly player: Player;
    private cardsDealt: Card[] = [];

    constructor() {
        this.dealer = new Dealer();
        this.player = new Player();
    }

    start() {
        this.player.drawMoney();
        this.newRound();
        this.initActions();
    }

    private newRound(): void {
        this.cardsDealt = [];
        this.dealer.hand = [];
        this.player.hand = [];
    }

    private dealCards(): void {
        [...Array(2)].forEach(() => {
            this.dealer.addCard(this.cardsDealt);
            this.player.addCard(this.cardsDealt);
        });
    }

    private hit(): void {
        this.player.addCard(this.cardsDealt);
        
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

        this.newRound();
    }

    private stand(): void {
        while (Rules.DEALER_HIT_LIMIT > this.dealer.score) {
            this.dealer.addCard(this.cardsDealt);
        }

        this.endRound();
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