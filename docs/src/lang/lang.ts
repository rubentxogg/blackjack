import data from '../../assets/lang.json' with { type: 'json' };
import { ActionButton } from '../action-button/action-button.js';
import { Lang as LangCode } from './lang.constants.js';

export class Lang {

    static readonly avaliable = [LangCode.ENGLISH, LangCode.SPANISH];
    static readonly default = LangCode.ENGLISH;

    private constructor() { }

    static get data(): any {
        const lang = (navigator.language.slice(0, 2) ?? Lang.default) as keyof typeof data;

        return this.avaliable.includes(lang) ? data[lang] : data[Lang.default];
    }

    static translateButtons(): void {
        const data = Lang.data.action;

        ActionButton.placeBet.children[0].textContent = data.placeBet;
        ActionButton.hit.innerText = data.hit;
        ActionButton.stand.innerText = data.stand;
        ActionButton.doubleDown.innerText = data.doubleDown;
        ActionButton.decline.innerText = data.decline;
    }

    static translateRoles(): void {
        const data = Lang.data.role;

        (document.getElementById('dealer-text') as HTMLSpanElement).textContent = data.dealer;
        (document.getElementById('player-text') as HTMLSpanElement).textContent = data.player;
    }

    static translateFooter(): void {
        const data = Lang.data.footer;

        (document.getElementById('current-bet-text') as HTMLSpanElement).textContent = data.currentBet;
        (document.getElementById('total-money-text') as HTMLSpanElement).textContent = data.totalMoney;
    }

    static translateHowToPlay(): void {
        const data = Lang.data.howToPlay;

        // How to play
        (document.getElementById('how-to-play-title') as HTMLSpanElement).textContent = data.title;
        
        // Goal
        (document.getElementById('goal-title') as HTMLSpanElement).textContent = data.goal.title;
        (document.getElementById('goal-text') as HTMLSpanElement).textContent = data.goal.text;

        // Card Values
        (document.getElementById('card-values-title') as HTMLSpanElement).textContent = data.cardValues.title;
        (document.getElementById('card-values-number-text') as HTMLSpanElement).textContent = data.cardValues.number;
        (document.getElementById('card-values-face-text') as HTMLSpanElement).textContent = data.cardValues.face;
        (document.getElementById('card-values-aces-text') as HTMLSpanElement).textContent = data.cardValues.aces;

        // Player Actions
        (document.getElementById('player-actions-title') as HTMLSpanElement).textContent = data.playerActions.title;
        (document.getElementById('player-actions-hit-title') as HTMLSpanElement).textContent = data.playerActions.hit.title;
        (document.getElementById('player-actions-hit-text') as HTMLSpanElement).textContent = data.playerActions.hit.text;
        (document.getElementById('player-actions-bet-title') as HTMLSpanElement).textContent = data.playerActions.bet.title;
        (document.getElementById('player-actions-bet-text') as HTMLSpanElement).textContent = data.playerActions.bet.text;
        (document.getElementById('player-actions-stand-title') as HTMLSpanElement).textContent = data.playerActions.stand.title;
        (document.getElementById('player-actions-stand-text') as HTMLSpanElement).textContent = data.playerActions.stand.text;
        (document.getElementById('player-actions-double-down-title') as HTMLSpanElement).textContent = data.playerActions.doubleDown.title;
        (document.getElementById('player-actions-double-down-text') as HTMLSpanElement).textContent = data.playerActions.doubleDown.text;
        (document.getElementById('player-actions-insurance-bet-title') as HTMLSpanElement).textContent = data.playerActions.insuranceBet.title;
        (document.getElementById('player-actions-insurance-bet-text') as HTMLSpanElement).textContent = data.playerActions.insuranceBet.text;

        // Round Result
        (document.getElementById('round-result-title') as HTMLSpanElement).textContent = data.roundResult.title;
        (document.getElementById('round-result-win-title') as HTMLSpanElement).textContent = data.roundResult.win.title;
        (document.getElementById('round-result-win-text') as HTMLSpanElement).textContent = data.roundResult.win.text;
        (document.getElementById('round-result-bust-title') as HTMLSpanElement).textContent = data.roundResult.bust.title;
        (document.getElementById('round-result-bust-text') as HTMLSpanElement).textContent = data.roundResult.bust.text;
        (document.getElementById('round-result-push-title') as HTMLSpanElement).textContent = data.roundResult.push.title;
        (document.getElementById('round-result-push-text') as HTMLSpanElement).textContent = data.roundResult.push.text;

        // Special Situations
        (document.getElementById('special-situations-title') as HTMLSpanElement).textContent = data.specialSituations.title;
        (document.getElementById('special-situations-blackjack-title') as HTMLSpanElement).textContent = data.specialSituations.blackjack.title;
        (document.getElementById('special-situations-blackjack-text') as HTMLSpanElement).textContent = data.specialSituations.blackjack.text;
        (document.getElementById('special-situations-insurance-title') as HTMLSpanElement).textContent = data.specialSituations.insurance.title;
        (document.getElementById('special-situations-insurance-text') as HTMLSpanElement).textContent = data.specialSituations.insurance.text;
    }

    static translateAll(): void {
        this.translateButtons();
        this.translateRoles();
        this.translateFooter();
        this.translateHowToPlay();
    }
}