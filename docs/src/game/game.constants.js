export class Game {
    /**
     * Blackjack (3:2 payout): For every $2 you wager, you win $3.
     * Other winning hands (1:1 payout): For every $1 you wager, you win $1.
     * Insurance (2:1 payout): If you take insurance and the dealer has a blackjack, you win 2:1 on your insurance bet. Player can bet no greater than half of the initial bet
     */
    constructor() { }
}
Game.BLACKJACK = 21;
Game.DEALER_HIT_LIMIT = 17;
Game.BLACKJACK_PAYOUT = 1.5;
Game.CARD_IMAGES = [
    './assets/CLUBS-ACE.svg',
    './assets/CLUBS-EIGHT.svg',
    './assets/CLUBS-FIVE.svg',
    './assets/CLUBS-FOUR.svg',
    './assets/CLUBS-JACK.svg',
    './assets/CLUBS-KING.svg',
    './assets/CLUBS-NINE.svg',
    './assets/CLUBS-QUEEN.svg',
    './assets/CLUBS-SEVEN.svg',
    './assets/CLUBS-SIX.svg',
    './assets/CLUBS-TEN.svg',
    './assets/CLUBS-THREE.svg',
    './assets/CLUBS-TWO.svg',
    './assets/DIAMONDS-ACE.svg',
    './assets/DIAMONDS-EIGHT.svg',
    './assets/DIAMONDS-FIVE.svg',
    './assets/DIAMONDS-FOUR.svg',
    './assets/DIAMONDS-JACK.svg',
    './assets/DIAMONDS-KING.svg',
    './assets/DIAMONDS-NINE.svg',
    './assets/DIAMONDS-QUEEN.svg',
    './assets/DIAMONDS-SEVEN.svg',
    './assets/DIAMONDS-SIX.svg',
    './assets/DIAMONDS-TEN.svg',
    './assets/DIAMONDS-THREE.svg',
    './assets/DIAMONDS-TWO.svg',
    './assets/HEARTS-ACE.svg',
    './assets/HEARTS-EIGHT.svg',
    './assets/HEARTS-FIVE.svg',
    './assets/HEARTS-FOUR.svg',
    './assets/HEARTS-JACK.svg',
    './assets/HEARTS-KING.svg',
    './assets/HEARTS-NINE.svg',
    './assets/HEARTS-QUEEN.svg',
    './assets/HEARTS-SEVEN.svg',
    './assets/HEARTS-SIX.svg',
    './assets/HEARTS-TEN.svg',
    './assets/HEARTS-THREE.svg',
    './assets/HEARTS-TWO.svg',
    './assets/HIDDEN.svg',
    './assets/SPADES-ACE.svg',
    './assets/SPADES-EIGHT.svg',
    './assets/SPADES-FIVE.svg',
    './assets/SPADES-FOUR.svg',
    './assets/SPADES-JACK.svg',
    './assets/SPADES-KING.svg',
    './assets/SPADES-NINE.svg',
    './assets/SPADES-QUEEN.svg',
    './assets/SPADES-SEVEN.svg',
    './assets/SPADES-SIX.svg',
    './assets/SPADES-TEN.svg',
    './assets/SPADES-THREE.svg',
    './assets/SPADES-TWO.svg'
];
Game.ADD_CARD_DELAY = 7e2;
Game.NEW_ROUND_DELAY_MS = 3e3;
