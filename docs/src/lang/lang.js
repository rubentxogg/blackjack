import data from '../../assets/lang.json' with { type: 'json' };
import { ActionButton } from '../action-button/action-button.js';
import { Lang as LangCode } from './lang.constants.js';
export class Lang {
    constructor() { }
    static get data() {
        var _a;
        const lang = ((_a = navigator.language.slice(0, 2)) !== null && _a !== void 0 ? _a : Lang.default);
        return this.avaliable.includes(lang) ? data[lang] : data[Lang.default];
    }
    static translateButtons() {
        const data = Lang.data.action;
        ActionButton.placeBet.children[0].textContent = data.placeBet;
        ActionButton.hit.innerText = data.hit;
        ActionButton.stand.innerText = data.stand;
        ActionButton.doubleDown.innerText = data.doubleDown;
        ActionButton.decline.innerText = data.decline;
    }
    static translateRoles() {
        const data = Lang.data.role;
        document.getElementById('dealer-text').textContent = data.dealer;
        document.getElementById('player-text').textContent = data.player;
    }
    static translateFooter() {
        const data = Lang.data.footer;
        document.getElementById('current-bet-text').textContent = data.currentBet;
        document.getElementById('total-money-text').textContent = data.totalMoney;
    }
    static translateHowToPlay() {
        const data = Lang.data.howToPlay;
        // How to play
        document.getElementById('how-to-play-title').textContent = data.title;
        // Goal
        document.getElementById('goal-title').textContent = data.goal.title;
        document.getElementById('goal-text').textContent = data.goal.text;
        // Card Values
        document.getElementById('card-values-title').textContent = data.cardValues.title;
        document.getElementById('card-values-number-text').textContent = data.cardValues.number;
        document.getElementById('card-values-face-text').textContent = data.cardValues.face;
        document.getElementById('card-values-aces-text').textContent = data.cardValues.aces;
        // Player Actions
        document.getElementById('player-actions-title').textContent = data.playerActions.title;
        document.getElementById('player-actions-hit-title').textContent = data.playerActions.hit.title;
        document.getElementById('player-actions-hit-text').textContent = data.playerActions.hit.text;
        document.getElementById('player-actions-bet-title').textContent = data.playerActions.bet.title;
        document.getElementById('player-actions-bet-text').textContent = data.playerActions.bet.text;
        document.getElementById('player-actions-stand-title').textContent = data.playerActions.stand.title;
        document.getElementById('player-actions-stand-text').textContent = data.playerActions.stand.text;
        document.getElementById('player-actions-double-down-title').textContent = data.playerActions.doubleDown.title;
        document.getElementById('player-actions-double-down-text').textContent = data.playerActions.doubleDown.text;
        document.getElementById('player-actions-insurance-bet-title').textContent = data.playerActions.insuranceBet.title;
        document.getElementById('player-actions-insurance-bet-text').textContent = data.playerActions.insuranceBet.text;
        // Round Result
        document.getElementById('round-result-title').textContent = data.roundResult.title;
        document.getElementById('round-result-win-title').textContent = data.roundResult.win.title;
        document.getElementById('round-result-win-text').textContent = data.roundResult.win.text;
        document.getElementById('round-result-bust-title').textContent = data.roundResult.bust.title;
        document.getElementById('round-result-bust-text').textContent = data.roundResult.bust.text;
        document.getElementById('round-result-push-title').textContent = data.roundResult.push.title;
        document.getElementById('round-result-push-text').textContent = data.roundResult.push.text;
        // Special Situations
        document.getElementById('special-situations-title').textContent = data.specialSituations.title;
        document.getElementById('special-situations-blackjack-title').textContent = data.specialSituations.blackjack.title;
        document.getElementById('special-situations-blackjack-text').textContent = data.specialSituations.blackjack.text;
        document.getElementById('special-situations-insurance-title').textContent = data.specialSituations.insurance.title;
        document.getElementById('special-situations-insurance-text').textContent = data.specialSituations.insurance.text;
    }
    static translateAll() {
        this.translateButtons();
        this.translateRoles();
        this.translateFooter();
        this.translateHowToPlay();
    }
}
Lang.avaliable = [LangCode.ENGLISH, LangCode.SPANISH];
Lang.default = LangCode.ENGLISH;
