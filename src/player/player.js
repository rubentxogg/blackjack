import { Role } from "../role/role.js";
export class Player extends Role {
    constructor() {
        super(Player.name.toLocaleLowerCase());
        this.money = 100;
        this.bet = 0;
    }
    placeBet(bet) {
        this.bet = bet;
        return Promise.resolve();
    }
}
