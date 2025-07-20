import { Role as RoleEnum } from "./role/role.enum.js";
import { Role } from "./role/role.js";
startGame();
function startGame() {
    console.log("Game starts");
    const dealer = new Role(RoleEnum.DEALER);
    const player = new Role(RoleEnum.PLAYER);
    dealer.addCard();
    player.addCard();
    player.addCard();
    console.log(player.score);
}
