import { Game as Rules } from "../game/game.constants.js";
import { Role } from "../role/role.js";

export class Player extends Role {
    private readonly moneyDisplay: HTMLSpanElement;
    private readonly betDisplay: HTMLSpanElement;
    money = 100;
    bet = 0;

    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);

        this.moneyDisplay = document.getElementById(`${PLAYER}-money`) as HTMLSpanElement;
        this.betDisplay = document.getElementById(`${PLAYER}-bet`) as HTMLSpanElement;

        this.refreshMoney();
        this.refreshBet();
    }

    placeBet(): void {
        const bet = (document.getElementById('bet') as HTMLInputElement).value;

        this.bet = Number.parseInt(bet);
        this.money -= this.bet;

        this.refreshMoney();
        this.refreshBet();
    }

    refreshMoney(): void {
        this.moneyDisplay.innerText = `$${this.money.toString()}`;
    }

    private refreshBet(): void {
        this.betDisplay.innerText = `${this.bet.toString()}`;
    }

    refreshMoneyAfterResult(resultFunc: Function): void {
        resultFunc.call(this);
        this.refreshMoney();
        this.setResultClass(resultFunc.name);
    }

    bust(): void {
        if (this.money <= 0) {
            alert("No money left, game will restart");
            location.reload();
        }
    }

    win(): void {
        this.money += (this.bet * Rules.ODDS);
    }

    private setResultClass(result: string): void {
        this.moneyDisplay.className = `money-${result}`;

        setTimeout(() => {
            this.moneyDisplay.className = '';
            this.betDisplay.innerText = '0';
        }, 15e2);
    }

    /**
     * Occurs when the player and the dealer have the same total value for their hands at the end of a round. 
     * When this happens, the player neither wins nor loses the bet; instead, the player’s original bet is returned. 
     */
    push(): void {
        this.money += this.bet;
    }
}