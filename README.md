# Game ReadMe

This is a simple HTML-based game with accompanying CSS and JavaScript files. The game features a character that can move around a town environment. Additionally, there's a battle system that activates when the player character enters specific zones.

## Getting Started

1. Download the HTML file (`index.html`), CSS file (`styles.css`), and all JavaScript files.
2. Ensure that the following libraries are accessible:
   - [Howler.js](https://howlerjs.com/): A JavaScript audio library.
   - [GSAP](https://greensock.com/gsap/): The GreenSock Animation Platform.
3. Make sure to have the game assets (images) in the correct file paths as specified in the JavaScript code.
4. Open the HTML file in a web browser to play the game.

## Game Overview

- **HTML (`index.html`):**

  - The structure of the game is defined in HTML, including the canvas for rendering, UI elements, and script references.
  - External libraries (Howler.js and GSAP) are included via CDN links.

- **CSS (`styles.css`):**

  - Basic styling is applied to the game elements using CSS.
  - Fonts from Google Fonts (`Press Start 2P` and `Bebas Neue`) are imported.

- **JavaScript Files:**
  - `data/audio.js`: Defines audio resources and manages audio playback.
  - `data/battlezones.js`: Contains data about battle zones.
  - `data/collisions.js`: Contains data about collision areas.
  - `data/attacks.js`: Defines attack-related data.
  - `data/monsters.js`: Defines data about monsters in the game.
  - `classes.js`: Contains JavaScript classes for game entities like `Boundary` and `Sprite`.
  - `script.js`: Implements the game logic for player movement, collisions, and initiating battles.
  - `battlescene.js`: Manages the battle scene, including animations and transitions.

## Playing the Game

- The player character can be moved using the W, A, S, and D keys.
- Battles are initiated when the player enters specific zones.
- The game features a basic UI with health bars for the player and enemy, an attack bar, and a dialogue box.
- Audio cues enhance the gaming experience.

## Notes

- This is a simplified example and can be expanded upon for a more complete game experience.
- Ensure that you have a reliable internet connection to access external libraries.
- Feel free to customize the game elements, styles, and functionality to suit your preferences.

Enjoy playing the game!
