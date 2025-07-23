import { Game as Rules } from "../game/game.constants.js";
import { Role } from "../role/role.js";
export class Player extends Role {
    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);
        this.money = 100;
        this.bet = 0;
        this.moneyBox = document.getElementById(`${PLAYER}-money`);
        this.refreshMoney();
    }
    placeBet() {
        const bet = document.getElementById('bet').value;
        this.bet = Number.parseInt(bet);
        this.money -= this.bet;
        this.refreshMoney();
    }
    refreshMoney() {
        if (this.moneyBox) {
            this.moneyBox.innerText = `$${this.money.toString()}`;
        }
    }
    refreshMoneyAfterResult(resultFunc) {
        resultFunc.call(this);
        this.refreshMoney();
    }
    lose() {
        this.money -= this.bet;
        alert("Player loses");
    }
    win() {
        this.money += (this.bet * Rules.ODDS);
        alert("Player wins");
    }
    draw() {
        this.money += this.bet;
        alert("DRAW!");
    }
}
