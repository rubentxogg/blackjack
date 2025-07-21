import { Card } from "./card/card.js";
import { Game } from "./game.constants.js";
import { Role as RoleType } from "./role/role.enum.js";
import { Role } from "./role/role.js";

let player: Role;
let dealer: Role;
let cardsDealt: Card[] = [];

startGame();

function startGame(): void {
    dealer = new Role(RoleType.DEALER);
    player = new Role(RoleType.PLAYER);

    initActions();
}

function hit(): void {
    player.addCard(cardsDealt);

    checkScore();
}

function checkScore(): void {
    // TODO
    if (player.score === Game.BLACK_JACK) {
        console.log("BLACK JACK");
        stand();
    } else if (player.score > Game.BLACK_JACK) {
        console.log("Player loses");
    }
}

function stand(): void {
    // TODO
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