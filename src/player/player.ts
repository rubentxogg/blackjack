import { Role } from "../role/role.js";
import { Game } from "../game/game.constants.js";

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

        this.refreshDisplay();
    }

    get payment() {
        return !this.blackjack ? this.bet : (this.bet * Game.BLACKJACK_PAYOUT);
    }

    placeBet(): void {
        const bet = (document.getElementById('bet') as HTMLInputElement).value;

        this.bet = Number(bet);
        this.money -= this.bet;

        this.refreshDisplay();
    }

    refreshMoney(): void {
        this.moneyDisplay.innerText = `$${this.money.toString()}`;
    }

    refreshBet(): void {
        this.betDisplay.innerText = this.bet.toString();
    }

    private refreshDisplay(resultFunc?: Function): void {
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

    displayResult(resultFunc: Function): void {
        const type = resultFunc.name;
        this.resultType.innerText = `${type}!`;

        let money = '';

        if (type === this.win.name) {
            money = `+$${this.payment.toString()}`;
        } else if (type === this.bust.name) {
            money = `-$${this.bet.toString()}`;
        }

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

    bust(): void {
        if (this.money <= 0) {
            alert("You've run out of money. \nGame will restart, good luck!");
            location.reload();
        }
    }

    win(): void {
        this.money += this.payment;
    }

    /**
     * Occurs when the player and the dealer have the same total value for their hands at the end of a round. 
     * When this happens, the player neither wins nor loses the bet; instead, the player’s original bet is returned. 
     */
    push(): void {
        this.money += this.bet;
    }

    hasBlackjack(): boolean {
        // if (!this.blackjack) {
        //     return false;
        // }

        this.resultMoney.innerText = '';
        this.resultDisplay.className = 'result-display';
        this.resultType.className = 'blackjack';  // TODO Bumping letters animation
        this.resultType.innerText = 'BLACKJACK!';


        setTimeout(() => {
            this.resultType.className = '';
            this.resultDisplay.className = '';
        }, 3e3);

        return true;
    }
}