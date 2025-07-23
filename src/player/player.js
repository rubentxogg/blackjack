import { Game as Rules } from "../game/game.constants.js";
import { Role } from "../role/role.js";
export class Player extends Role {
    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);
        this.money = 100;
        this.bet = 0;
        this.moneyBox = document.getElementById(`${PLAYER}-money`);
    }
    placeBet() {
        const bet = document.getElementById('bet').value;
        this.bet = Number.parseInt(bet);
        this.money -= this.bet;
        this.drawMoney();
        return Promise.resolve();
    }
    drawMoney() {
        if (this.moneyBox) {
            this.moneyBox.innerText = `$${this.money.toString()}`;
        }
    }
    lose() {
        this.money -= this.bet;
        this.drawMoney();
        alert("Player loses");
    }
    win() {
        this.money += (this.bet * Rules.ODDS);
        this.drawMoney();
        alert("Player wins");
    }
    draw() {
        this.money += this.bet;
        this.drawMoney();
        alert("DRAW!");
    }
}
