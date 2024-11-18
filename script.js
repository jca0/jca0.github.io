const breadcrumb = document.getElementById('breadcrumb');
const duck = document.getElementById('duck');
const quackSound = document.getElementById('quack-sound');

// ASCII art for the duck
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

// Set the initial duck ASCII art
duck.textContent = duckOpen;

// Update breadcrumb position on mouse move
document.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Move the breadcrumb
  breadcrumb.style.left = `${mouseX}px`;
  breadcrumb.style.top = `${mouseY}px`;
});

// Make the duck follow the breadcrumb
let duckX = 0; // Initial duck position
const duckSpeed = 5; // Speed of the duck movement

function moveDuck() {
  const breadcrumbX = parseFloat(breadcrumb.style.left || 0);

  // Move the duck horizontally towards the breadcrumb
  if (duckX < breadcrumbX) {
    duckX = Math.min(duckX + duckSpeed, breadcrumbX);
    duck.style.transform = 'scaleX(1)'; // Face right
  } else if (duckX > breadcrumbX) {
    duckX = Math.max(duckX - duckSpeed, breadcrumbX);
    duck.style.transform = 'scaleX(-1)'; // Face left
  }

  duck.style.left = `${duckX}px`;

  // Toggle between open and closed mouth
  duck.textContent = duck.textContent === duckOpen ? duckClosed : duckOpen;

  // Play quack sound randomly as the duck moves
  if (Math.random() < 0.05) { // Adjust probability to control frequency
    quackSound.currentTime = 0;
    quackSound.play();
  }

  requestAnimationFrame(moveDuck);
}
