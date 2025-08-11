import { Game } from "./game/game.js";
import { Game as Constants } from "./game/game.constants.js";
preloadImages(Constants.CARD_IMAGES);
new Game().start();
function preloadImages(images) {
    images.forEach(src => {
        const image = new Image();
        image.src = src;
    });
}
