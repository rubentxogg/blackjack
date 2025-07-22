import { Role } from "../role/role.js";

export class Player extends Role {
    money = 100;
    bet = 0;

    constructor() {
        super(Player.name.toLocaleLowerCase());
    }

    placeBet(bet: number): Promise<any> {
        this.bet = bet;

        return Promise.resolve();
    }
}