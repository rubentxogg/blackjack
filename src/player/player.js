import { Game as Rules } from "../game/game.constants.js";
import { Role } from "../role/role.js";
export class Player extends Role {
    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);
        this.money = 100;
        this.bet = 0;
        this.moneyDisplay = document.getElementById(`${PLAYER}-money`);
        this.betDisplay = document.getElementById(`${PLAYER}-bet`);
        this.resultDisplay = document.getElementById('result-message');
        this.refreshMoney();
        this.refreshBet();
    }
    get profit() {
        return this.bet * Rules.ODDS;
    }
    placeBet() {
        const bet = document.getElementById('bet').value;
        this.bet = Number.parseInt(bet);
        this.money -= this.bet;
        this.refreshMoney();
        this.refreshBet();
    }
    refreshMoney() {
        this.moneyDisplay.innerText = `$${this.money.toString()}`;
    }
    refreshBet(bet) {
        this.betDisplay.innerText = bet !== null && bet !== void 0 ? bet : `${this.bet.toString()}`;
    }
    refreshMoneyAfterResult(resultFunc) {
        resultFunc.call(this);
        this.refreshMoney();
        this.setResultClass(resultFunc.name);
    }
    setResultMessage(resultFunc) {
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
    bust() {
        if (this.money <= 0) {
            alert("No money left, game will restart");
            location.reload();
        }
    }
    win() {
        this.money += this.profit;
    }
    setResultClass(result) {
        this.moneyDisplay.className = `money-${result}`;
        setTimeout(() => {
            this.moneyDisplay.className = '';
        }, 15e2);
    }
    /**
     * Occurs when the player and the dealer have the same total value for their hands at the end of a round.
     * When this happens, the player neither wins nor loses the bet; instead, the player’s original bet is returned.
     */
    push() {
        this.money += this.bet;
    }
}
