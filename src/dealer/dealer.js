import { Role } from "../role/role.js";
export class Dealer extends Role {
    constructor() {
        super(Dealer.name.toLocaleLowerCase());
    }
}
