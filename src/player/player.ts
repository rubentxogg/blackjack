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
    }

    placeBet(): Promise<any> {
        const bet = (document.getElementById('bet') as HTMLInputElement).value;

        this.bet = Number.parseInt(bet);
        this.money -= this.bet;

        this.drawMoney();

        return Promise.resolve();
    }

    drawMoney(): void {
        if (this.moneyBox) {
            this.moneyBox.innerText = `$${this.money.toString()}`;
        }
    }

    lose(): void {
        this.money -= this.bet;
        this.drawMoney();
        alert("Player loses");
    }

    win(): void {
        this.money += (this.bet * Rules.ODDS);
        this.drawMoney();
        alert("Player wins");
    }

    draw(): void {
        this.money += this.bet;
        this.drawMoney();
        alert("DRAW!");
    }
}