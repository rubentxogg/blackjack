export class Game {
    static readonly BLACKJACK = 21;
    static readonly DEALER_HIT_LIMIT = 17;
    static readonly BLACKJACK_PAYOUT = 1.5;

    /**
     * Blackjack (3:2 payout): For every $2 you wager, you win $3. 
     * Other winning hands (1:1 payout): For every $1 you wager, you win $1. 
     * Insurance (2:1 payout): If you take insurance and the dealer has a blackjack, you win 2:1 on your insurance bet
     */

    private constructor() { }
}