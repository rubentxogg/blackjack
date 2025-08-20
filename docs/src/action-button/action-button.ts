export class ActionButton {

    private constructor() { }

    static readonly betInput = document.getElementById('bet') as HTMLInputElement;
    static readonly howToPlayOpenButton = document.getElementById('open-how-to-play') as HTMLButtonElement;
    static readonly howToPlayDialog = document.getElementById('how-to-play-dialog') as HTMLDialogElement;
    static readonly howToPlayCloseButton = document.getElementById('close-how-to-play') as HTMLButtonElement;

    // Actions
    static readonly placeBet = document.getElementById('place-bet') as HTMLButtonElement;
    static readonly hit = document.getElementById('hit') as HTMLButtonElement;
    static readonly stand = document.getElementById('stand') as HTMLButtonElement;
    static readonly doubleDown = document.getElementById('double-down') as HTMLButtonElement;
    static readonly decline = document.getElementById('decline') as HTMLButtonElement;

    // Betting chips
    static readonly chip1 = document.getElementById('chip-1') as HTMLButtonElement;
    static readonly chip5 = document.getElementById('chip-5') as HTMLButtonElement;
    static readonly chip10 = document.getElementById('chip-10') as HTMLButtonElement;
    static readonly chip25 = document.getElementById('chip-25') as HTMLButtonElement;
    static readonly chip100 = document.getElementById('chip-100') as HTMLButtonElement;
    static readonly chip500 = document.getElementById('chip-500') as HTMLButtonElement;
    static readonly chip1k = document.getElementById('chip-1k') as HTMLButtonElement;
    static readonly chip5k = document.getElementById('chip-5k') as HTMLButtonElement;

    static ripple(button: HTMLButtonElement): void {
        button.classList.add('ripple');
        setTimeout(() => button.classList.remove('ripple'), 200);
    }

    static update(config: ButtonConfig[]): void {
        config.forEach(cfg => {
            cfg.button.style.display = cfg.visible ? 'block' : 'none';
            cfg.button.disabled = cfg.disabled;
        });
    }
}