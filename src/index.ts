import { Card } from "./card/card.js";
import { Game } from "./game.constants.js";
import { Role as RoleType } from "./role/role.enum.js";
import { Role } from "./role/role.js";

let player: Role;
let dealer: Role;
let cardsDealt: Card[] = [];

startGame();

function startGame(): void {
    dealCards();
    initActions();
}

function dealCards(): void {
    dealer = new Role(RoleType.DEALER);
    player = new Role(RoleType.PLAYER);

    [...Array(2)].forEach(() => {
        dealer.addCard(cardsDealt);
        player.addCard(cardsDealt);
    });
}

function hit(): void {
    player.addCard(cardsDealt);
    checkScore();
}

function checkScore(): void {
    // TODO
    if (player.score > Game.BLACK_JACK) {
        console.log("The player loses");
    } else if (player.score === Game.BLACK_JACK) {
        console.log("BLACK JACK");
    } else if ((dealer.score <= Game.BLACK_JACK) && (dealer.score > player.score)) {
        console.log("The player loses");
    } else {
        console.log("The player wins");
    }
}

function stand(): void {
    while(Game.DEALER_HIT_LIMIT > dealer.score) {
        dealer.addCard(cardsDealt);
    }

    checkScore();
}

function doubleDown(): void {
    // TODO
}

function split(): void {
    // TODO
}

function initActions(): void {
    const EVENT = {
        CLICK: 'click'
    };

    document.getElementById(hit.name)?.addEventListener(EVENT.CLICK, () => hit());
    document.getElementById(stand.name)?.addEventListener(EVENT.CLICK, () => stand());
}