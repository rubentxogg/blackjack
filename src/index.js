import { Game } from "./game.constants.js";
import { Role as RoleType } from "./role/role.enum.js";
import { Role } from "./role/role.js";
let player;
let dealer;
let cardsDealt = [];
startGame();
function startGame() {
    dealCards();
    initActions();
}
function dealCards() {
    dealer = new Role(RoleType.DEALER);
    player = new Role(RoleType.PLAYER);
    [...Array(2)].forEach(() => {
        dealer.addCard(cardsDealt);
        player.addCard(cardsDealt);
    });
}
function hit() {
    player.addCard(cardsDealt);
    checkScore();
}
function checkScore() {
    // TODO
    if (player.score > Game.BLACK_JACK) {
        console.log("The player loses");
    }
    else if (player.score === Game.BLACK_JACK) {
        console.log("BLACK JACK");
    }
    else if ((dealer.score <= Game.BLACK_JACK) && (dealer.score > player.score)) {
        console.log("The player loses");
    }
    else {
        console.log("The player wins");
    }
}
function stand() {
    while (Game.DEALER_HIT_LIMIT > dealer.score) {
        dealer.addCard(cardsDealt);
    }
    checkScore();
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
    (_a = document.getElementById(hit.name)) === null || _a === void 0 ? void 0 : _a.addEventListener(EVENT.CLICK, () => hit());
    (_b = document.getElementById(stand.name)) === null || _b === void 0 ? void 0 : _b.addEventListener(EVENT.CLICK, () => stand());
}
