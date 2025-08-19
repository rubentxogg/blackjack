import { Role } from "../role/role.js";
import { Game } from "../game/game.constants.js";

export class Player extends Role {
    private readonly moneyDisplay: HTMLSpanElement;
    private readonly betDisplay: HTMLSpanElement;
    private readonly resultDisplay: HTMLDivElement;
    private readonly resultType: HTMLSpanElement;
    private readonly resultMoney: HTMLSpanElement;
    private readonly blackjackDisplay: HTMLDivElement;

    money = 100;
    bet = 0;
    insuranceBet = 0;
    isDoublingDown = false;
    isPlayingInsurance = false;

    constructor() {
        const PLAYER = Player.name.toLocaleLowerCase();
        super(PLAYER);

        this.moneyDisplay = document.getElementById(`${PLAYER}-money`) as HTMLSpanElement;
        this.betDisplay = document.getElementById(`${PLAYER}-bet`) as HTMLSpanElement;
        this.resultDisplay = document.getElementById('result-display') as HTMLDivElement;
        this.resultType = document.getElementById('result-type') as HTMLSpanElement;
        this.resultMoney = document.getElementById('result-money') as HTMLSpanElement;
        this.blackjackDisplay = document.getElementById('blackjack-display') as HTMLDivElement;

        this.refreshDisplay();
    }

    get payment() {
        if(this.isPlayingInsurance) {
            return this.insuranceBet * Game.INSURANCE_PAYOUT;
        }

        return !this.blackjack ? this.bet : (this.bet * Game.BLACKJACK_PAYOUT);
    }

    get canDoubleDown() {
        return this.bet <= this.money;
    }

    placeBet(): void {
        this.isDoublingDown = false;

        const bet = (document.getElementById('bet') as HTMLInputElement).value;

        if(this.isPlayingInsurance) {
            this.insuranceBet = Number(bet);
            this.money -= this.insuranceBet;
        } else {
            this.bet = Number(bet);
            this.money -= this.bet;
        }
        
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
        this.money += (!this.isPlayingInsurance ? (this.bet + this.payment) : (this.insuranceBet + this.payment));
    }

    /**
     * Occurs when the player and the dealer have the same total value for their hands at the end of a round. 
     * When this happens, the player neither wins nor loses the bet; instead, the player’s original bet is returned. 
     */
    push(): void {
        this.money += this.bet;
    }

    async hasBlackjack(): Promise<boolean> {
        if (!this.blackjack) {
            return Promise.resolve(false);
        }

        this.resultType.innerText = '';
        this.resultMoney.innerText = '';
        this.resultDisplay.className = 'result-display';
        this.blackjackDisplay.style.display = 'block';
        this.blackjackDisplay.className = 'wave';

        return new Promise(resolve => setTimeout(resolve, 3e3)).then(() => {
            this.blackjackDisplay.style.display = 'none';
            this.resultDisplay.className = '';
            this.blackjackDisplay.className = '';
            return true;
        });
    }

    doubleDown(): void {
        if (!this.canDoubleDown) {
            return;
        }

        this.isDoublingDown = true;
        this.money -= this.bet;
        this.bet += this.bet;
        this.refreshDisplay();
    }
}