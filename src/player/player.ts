import { Game as Rules } from "../game/game.constants.js";
import { Role } from "../role/role.js";

export class Player extends Role {
    private readonly moneyDisplay: HTMLSpanElement;
    private readonly betDisplay: HTMLSpanElement;
    private readonly resultDisplay: HTMLDivElement;
    private readonly resultType: HTMLSpanElement;
    private readonly resultMoney: HTMLSpanElement;

    money = 100;
    bet = 0;

    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);

        this.moneyDisplay = document.getElementById(`${PLAYER}-money`) as HTMLSpanElement;
        this.betDisplay = document.getElementById(`${PLAYER}-bet`) as HTMLSpanElement;
        this.resultDisplay = document.getElementById('result-display') as HTMLDivElement;
        this.resultType = document.getElementById('result-type') as HTMLSpanElement;
        this.resultMoney = document.getElementById('result-money') as HTMLSpanElement;

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

    private refreshMoneyAfterResult(resultFunc: Function): void {
        resultFunc.call(this);
        this.refreshMoney();
        this.setResultClass(resultFunc.name);
    }

    displayResult(resultFunc: Function): void {
        const type = resultFunc.name;
        this.resultType.innerText = type;

        const money = (type === this.win.name) ? `+$${this.profit.toString()}` : `-$${this.bet.toString()}`;
        this.resultMoney.innerText = money;

        this.resultDisplay.className = 'result-display';
        this.resultType.className = `result-type-${type}`;
        this.resultMoney.className = `result-money-${type}`;

        setTimeout(() => {
            this.resultType.className = '';
            this.resultMoney.className = '';
            this.resultDisplay.className = '';
            this.refreshMoneyAfterResult(resultFunc);
        }, 3e3);
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