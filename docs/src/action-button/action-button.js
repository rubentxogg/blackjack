export class ActionButton {
    constructor() { }
    static ripple(button) {
        button.classList.add('ripple');
        setTimeout(() => button.classList.remove('ripple'), 200);
    }
    static update(config) {
        config.forEach(cfg => {
            cfg.button.style.display = cfg.visible ? 'block' : 'none';
            cfg.button.disabled = cfg.disabled;
        });
    }
}
ActionButton.betInput = document.getElementById('bet');
ActionButton.howToPlayOpenButton = document.getElementById('open-how-to-play');
ActionButton.howToPlayDialog = document.getElementById('how-to-play-dialog');
ActionButton.howToPlayCloseButton = document.getElementById('close-how-to-play');
// Actions
ActionButton.placeBet = document.getElementById('place-bet');
ActionButton.hit = document.getElementById('hit');
ActionButton.stand = document.getElementById('stand');
ActionButton.doubleDown = document.getElementById('double-down');
ActionButton.decline = document.getElementById('decline');
ActionButton.allIn = document.getElementById('all-in');
ActionButton.reset = document.getElementById('reset-bet');
// Betting chips
ActionButton.chip05 = document.getElementById('chip-05');
ActionButton.chip1 = document.getElementById('chip-1');
ActionButton.chip5 = document.getElementById('chip-5');
ActionButton.chip10 = document.getElementById('chip-10');
ActionButton.chip25 = document.getElementById('chip-25');
ActionButton.chip100 = document.getElementById('chip-100');
ActionButton.chip500 = document.getElementById('chip-500');
ActionButton.chip1k = document.getElementById('chip-1k');
ActionButton.chip5k = document.getElementById('chip-5k');
