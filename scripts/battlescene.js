const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./img/battleBackground.png";

// Create a sprite for the battle background
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

// Initialize variables for battle animation
let draggle;
let emby;
let renderedSprites;
let battleAnimationID;
let queue;

// Function to initialize the battle
function initBattle() {
  // Display the battle user interface and hide the dialogue box
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";

  // Reset health bars and attack box
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  draggle = new Monster(monsters.Draggle);
  emby = new Monster(monsters.Emby);
  renderedSprites = [draggle, emby];
  queue = [];

  // Populate attack buttons in the user interface
  emby.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });
  // Attack event listeners
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];

      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites,
      });

      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint();
        });
        queue.push(() => {

          // fade back to black
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationID);
              animate();
              document.querySelector("#userInterface").style.display = "none";

              gsap.to("#overlappingDiv", {
                opacity: 0,
              });

              battle.initiated = false;

              // Play map audio
              audio.map.play();
            },
          });
        });
      }
      // draggle or enemy attacks
      const randomAttack =
        draggle.attacks[Math.floor(Math.random() * draggle.attacks.length) | 0];

      queue.push(() => {
        draggle.attack({
          attack: randomAttack,
          recipient: emby,
          renderedSprites,
        });

        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint();
          });

          queue.push(() => {
            // fade back to black
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationID);
                animate();
                document.querySelector("#userInterface").style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                battle.initiated = false;
                audio.map.play();
              },
            });
          });
        }
      });
    });

    // Display attack type on mouse hover
    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedAttack.type;
      document.querySelector("#attackType").style.color = selectedAttack.color;
    });
  });
}

// Function to animate the battle
function animateBattle() {
  battleAnimationID = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

// Start the battle animation
animate();

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});

// pop up how to play
document.addEventListener("DOMContentLoaded", function () {
  let popUp = document.querySelector("#pop_up_tutorial");
  popUp.style.display = "block";
});
document.querySelector("#close_pop_up").addEventListener("click", function () {
  let popUp = document.querySelector("#pop_up_tutorial");
  popUp.style.display = "none";
});
