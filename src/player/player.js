import { Game as Rules } from "../game/game.constants.js";
import { Role } from "../role/role.js";
export class Player extends Role {
    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);
        this.money = 100;
        this.bet = 0;
        this.moneyDisplay = document.getElementById(`${PLAYER}-money`);
        this.refreshMoney();
    }
    placeBet() {
        const bet = document.getElementById('bet').value;
        this.bet = Number.parseInt(bet);
        this.money -= this.bet;
        this.refreshMoney();
    }
    refreshMoney() {
        this.moneyDisplay.innerText = `$${this.money.toString()}`;
    }
    refreshMoneyAfterResult(resultFunc) {
        resultFunc.call(this);
        this.refreshMoney();
        this.setResultClass(resultFunc.name);
    }
    lose() {
        if (this.money <= 0) {
            alert("No money left, game will restart");
            location.reload();
        }
    }
    win() {
        this.money += (this.bet * Rules.ODDS);
    }
    setResultClass(result) {
        this.moneyDisplay.className = `money-${result}`;
        setTimeout(() => {
            this.moneyDisplay.className = '';
        }, 15e2);
    }
    draw() {
        this.money += this.bet;
        alert("DRAW!");
    }
}
