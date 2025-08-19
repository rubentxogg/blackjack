export class Game {
    /**
     * Blackjack (3:2 payout): For every $2 you wager, you win $3.
     * Other winning hands (1:1 payout): For every $1 you wager, you win $1.
     * Insurance (2:1 payout): If you take insurance and the dealer has a blackjack, you win 2:1 on your insurance bet. Player can bet no greater than half of the initial bet
     */
    constructor() { }
}
Game.ASSETS_CARDS = './assets/cards';
Game.BLACKJACK = 21;
Game.DEALER_HIT_LIMIT = 17;
Game.BLACKJACK_PAYOUT = 1.5; // 3:2
Game.INSURANCE_PAYOUT = 2; // 1:2
Game.CARD_IMAGES = [
    `${Game.ASSETS_CARDS}/CLUBS-ACE.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-EIGHT.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-FIVE.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-FOUR.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-JACK.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-KING.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-NINE.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-QUEEN.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-SEVEN.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-SIX.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-TEN.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-THREE.svg`,
    `${Game.ASSETS_CARDS}/CLUBS-TWO.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-ACE.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-EIGHT.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-FIVE.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-FOUR.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-JACK.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-KING.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-NINE.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-QUEEN.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-SEVEN.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-SIX.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-TEN.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-THREE.svg`,
    `${Game.ASSETS_CARDS}/DIAMONDS-TWO.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-ACE.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-EIGHT.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-FIVE.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-FOUR.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-JACK.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-KING.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-NINE.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-QUEEN.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-SEVEN.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-SIX.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-TEN.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-THREE.svg`,
    `${Game.ASSETS_CARDS}/HEARTS-TWO.svg`,
    `${Game.ASSETS_CARDS}/HIDDEN.svg`,
    `${Game.ASSETS_CARDS}/SPADES-ACE.svg`,
    `${Game.ASSETS_CARDS}/SPADES-EIGHT.svg`,
    `${Game.ASSETS_CARDS}/SPADES-FIVE.svg`,
    `${Game.ASSETS_CARDS}/SPADES-FOUR.svg`,
    `${Game.ASSETS_CARDS}/SPADES-JACK.svg`,
    `${Game.ASSETS_CARDS}/SPADES-KING.svg`,
    `${Game.ASSETS_CARDS}/SPADES-NINE.svg`,
    `${Game.ASSETS_CARDS}/SPADES-QUEEN.svg`,
    `${Game.ASSETS_CARDS}/SPADES-SEVEN.svg`,
    `${Game.ASSETS_CARDS}/SPADES-SIX.svg`,
    `${Game.ASSETS_CARDS}/SPADES-TEN.svg`,
    `${Game.ASSETS_CARDS}/SPADES-THREE.svg`,
    `${Game.ASSETS_CARDS}/SPADES-TWO.svg`
];
Game.ADD_CARD_DELAY = 7e2;
Game.NEW_ROUND_DELAY_MS = 3e3;
