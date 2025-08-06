import { Game as Rules } from "../game/game.constants.js";
import { Role } from "../role/role.js";

export class Player extends Role {
    private readonly moneyDisplay: HTMLSpanElement;
    private readonly betDisplay: HTMLSpanElement;
    private readonly resultDisplay: HTMLSpanElement;

    money = 100;
    bet = 0;

    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);

        this.moneyDisplay = document.getElementById(`${PLAYER}-money`) as HTMLSpanElement;
        this.betDisplay = document.getElementById(`${PLAYER}-bet`) as HTMLSpanElement;
        this.resultDisplay = document.getElementById('result-message') as HTMLSpanElement;

        this.refreshMoney();
        this.refreshBet();
    }

    get profit() {
        return this.bet * Rules.ODDS;
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

    refreshBet(bet?: string): void {
        this.betDisplay.innerText = bet ?? `${this.bet.toString()}`;
    }

    refreshMoneyAfterResult(resultFunc: Function): void {
        resultFunc.call(this);
        this.refreshMoney();
        this.setResultClass(resultFunc.name);
    }

    setResultMessage(resultFunc: Function): void {
        const result = resultFunc.name;
        const display = `${result} ${(resultFunc.name === this.win.name)
            ? ('+$' + this.profit)
            : '-$' + this.bet}`;

        this.resultDisplay.innerText = display;
        this.resultDisplay.className = `result-message-${result}`;

        setTimeout(() => {
            this.resultDisplay.className = '';
        }, 15e2);
    }

    bust(): void {
        if (this.money <= 0) {
            alert("No money left, game will restart");
            location.reload();
        }
    }

    win(): void {
        this.money += this.profit;
    }

    private setResultClass(result: string): void {
        this.moneyDisplay.className = `money-${result}`;

        setTimeout(() => {
            this.moneyDisplay.className = '';
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