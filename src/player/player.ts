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
        console.log("Player loses");
        this.money -= this.bet;
    }

    win(): void {
        console.log("Player wins");
        this.bet *= Rules.ODDS;
    }

    draw(): void {
        console.log("DRAW!");
        this.money += this.bet;
    }
}