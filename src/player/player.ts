import { Game as Rules } from "../game/game.constants.js";
import { Role } from "../role/role.js";

export class Player extends Role {
    private readonly moneyBox: HTMLElement | null;
    money = 100;
    bet = 0;

    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);

        this.moneyBox = document.getElementById(`${PLAYER}-money`);
        this.refreshMoney();
    }

    placeBet(): void {
        const bet = (document.getElementById('bet') as HTMLInputElement).value;

        this.bet = Number.parseInt(bet);
        this.money -= this.bet;

        this.refreshMoney();
    }

    refreshMoney(): void {
        if (this.moneyBox) {
            this.moneyBox.innerText = `$${this.money.toString()}`;
        }
    }

    refreshMoneyAfterResult(resultFunc: Function) {
        resultFunc.call(this);
        this.refreshMoney();
    }

    lose(): void {
        this.money -= this.bet;
        alert("Player loses");
    }

    win(): void {
        this.money += (this.bet * Rules.ODDS);
        alert("Player wins");
    }

    draw(): void {
        this.money += this.bet;
        alert("DRAW!");
    }
}