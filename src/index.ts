import { Card } from "./card/card.js";
import { Rank } from "./card/rank.enum.js";
import { Suit } from "./card/suit.enum.js";

const DEALER = document.getElementById('dealer');
const PLAYER = document.getElementById('player');

startGame();

function startGame(): void {
    console.log("Game starts");

    let card = new Card(Suit.CLUBS, Rank.TWO);

    let img = document.createElement('img');

    img.alt = card.face;
    img.src = `./assets/${card.face}.svg`;

    PLAYER?.appendChild(img);

    card = new Card(Suit.DIAMONDS, Rank.ACE);

    img = document.createElement('img');

    img.alt = card.face;
    img.src = `./assets/${card.face}.svg`;

    PLAYER?.appendChild(img);
}