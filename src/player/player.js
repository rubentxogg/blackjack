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
        console.log("Player loses");
        this.money -= this.bet;
    }
    win() {
        console.log("Player wins");
        this.bet *= Rules.ODDS;
    }
    draw() {
        console.log("DRAW!");
        this.money += this.bet;
    }
}
