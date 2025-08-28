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

    static translateAll(): void {
        this.translateButtons();
        this.translateRoles();
        this.translateFooter();
    }
}