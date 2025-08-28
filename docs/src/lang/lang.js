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
    static translateAll() {
        this.translateButtons();
        this.translateRoles();
        this.translateFooter();
    }
}
Lang.avaliable = [LangCode.ENGLISH, LangCode.SPANISH];
Lang.default = LangCode.ENGLISH;
