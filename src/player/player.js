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
        this.resultDisplay = document.getElementById('result-display');
        this.resultType = document.getElementById('result-type');
        this.resultMoney = document.getElementById('result-money');
        this.refreshDisplay();
    }
    get profit() {
        return this.bet * Rules.ODDS;
    }
    placeBet() {
        const bet = document.getElementById('bet').value;
        this.bet = Number.parseInt(bet);
        this.money -= this.bet;
        this.refreshDisplay();
    }
    refreshMoney() {
        this.moneyDisplay.innerText = `$${this.money.toString()}`;
    }
    refreshBet() {
        this.betDisplay.innerText = this.bet.toString();
    }
    refreshDisplay(resultFunc) {
        let moneyClass = 'refresh';
        if (resultFunc) {
            resultFunc.call(this);
            moneyClass = `money-${resultFunc.name}`;
            this.bet = 0;
        }
        this.betDisplay.className = 'refresh';
        this.moneyDisplay.className = moneyClass;
        this.refreshMoney();
        this.refreshBet();
        setTimeout(() => {
            this.moneyDisplay.className = '';
            this.betDisplay.className = '';
        }, 5e2);
    }
    displayResult(resultFunc) {
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
            this.refreshDisplay(resultFunc);
        }, 3e3);
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
    /**
     * Occurs when the player and the dealer have the same total value for their hands at the end of a round.
     * When this happens, the player neither wins nor loses the bet; instead, the player’s original bet is returned.
     */
    push() {
        this.money += this.bet;
    }
}
