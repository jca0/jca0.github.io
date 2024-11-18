const duck = document.getElementById('duck');
const quackSound = document.getElementById('quack-sound');

const duckOpen = `
    __
  >(o )__
   ( ._> /
    \`---'`;

const duckClosed = `
    __
  -(o )__
   ( ._> /
    \`---'`;

let duckFrames = [duckOpen, duckClosed];
let currentFrame = 0;

let duckX = 0;
let cursorX = 0;
let isQuacking = false;

function animateDuck() {
    currentFrame = (currentFrame + 1) % duckFrames.length;
    duck.textContent = duckFrames[currentFrame];

    // Adjust for the duck's width to center it on the cursor
    let duckWidth = duck.offsetWidth;
    let dx = cursorX - (duckX + duckWidth / 2);
    let speed = 2;

    if (Math.abs(dx) > speed) {
        duckX += speed * Math.sign(dx);
        isQuacking = false;
    } else {
        duckX += dx;
        if (!isQuacking) {
            quackSound.play();
            isQuacking = true;
        }
    }

    duck.style.left = duckX + 'px';

    requestAnimationFrame(animateDuck);
}

// Update cursorX whenever the mouse moves
document.addEventListener('mousemove', function(e) {
    cursorX = e.clientX;
});

// Start the duck animation
animateDuck();
