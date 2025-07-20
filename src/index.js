import { Game } from "./game.constants.js";
import { Role as RoleType } from "./role/role.enum.js";
import { Role } from "./role/role.js";
let player;
let dealer;
startGame();
function startGame() {
    dealer = new Role(RoleType.DEALER);
    player = new Role(RoleType.PLAYER);
    initActions();
}
function hit() {
    player.addCard();
    checkScore();
}
function checkScore() {
    // TODO
    if (player.score > Game.BLACK_JACK) {
        console.log("Player loses");
    }
}
function stand() {
    // TODO
}
function doubleDown() {
    // TODO
}
function split() {
    // TODO
}
function initActions() {
    var _a, _b;
    const EVENT = {
        CLICK: 'click'
    };
    (_a = document.getElementById('hit')) === null || _a === void 0 ? void 0 : _a.addEventListener(EVENT.CLICK, () => hit());
    (_b = document.getElementById('stand')) === null || _b === void 0 ? void 0 : _b.addEventListener(EVENT.CLICK, () => hit());
}
