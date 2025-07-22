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
        this.checkScore();
    }

    private checkScore(): void {
        // TODO
        if (this.player.score > Rules.BLACK_JACK) {
            console.log("The player loses");
        } else if (this.player.score === Rules.BLACK_JACK) {
            console.log("BLACK JACK");
            this.player.money = this.player.bet * Rules.ODDS;
        } else if ((this.dealer.score <= Rules.BLACK_JACK) && (this.dealer.score > this.player.score)) {
            console.log("The player loses");
        } else {
            console.log("The player wins");
        }
    }

    private stand(): void {
        while (Rules.DEALER_HIT_LIMIT > this.dealer.score) {
            this.dealer.addCard(this.cardsDealt);
        }

        this.checkScore();
    }

    private bet(): void {
        const bet = (document.getElementById('bet') as HTMLInputElement).value;

        this.player.placeBet(Number.parseInt(bet)).then(() => this.dealCards());
    }

    private doubleDown(): void {
        // TODO
    }

    private split(): void {
        // TODO
    }

    private initActions(): void {
        const EVENT = {
            CLICK: 'click'
        };

        const hitElement = document.getElementById(this.hit.name) as HTMLInputElement;
        const standElement = document.getElementById(this.stand.name) as HTMLInputElement;
        const betElement = document.getElementById(`place-${this.bet.name}`) as HTMLInputElement;

        hitElement?.addEventListener(EVENT.CLICK, () => this.hit());
        standElement?.addEventListener(EVENT.CLICK, () => this.stand());
        betElement?.addEventListener(EVENT.CLICK, (event) => {
            if (event.currentTarget === event.target) {
                this.bet();
            }
        });
    }
}