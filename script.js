// Select the duckling and quack sound elements
const duckling = document.getElementById('duckling');
const quackSound = document.getElementById('quack-sound');

// Initialize positions
let duckX = window.innerWidth / 2;
let duckY = window.innerHeight / 2;
let mouseX = duckX;
let mouseY = duckY;
let isMoving = false;
let idleTimer;

// Update mouse coordinates on mouse move
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    isMoving = true;

    // Clear any existing idle timer
    clearTimeout(idleTimer);

    // Remove 'idle' status
    duckling.classList.remove('idle');

    // Create a trail dot
    createTrailDot(duckX, duckY);

    // Set a new idle timer
    idleTimer = setTimeout(() => {
        isMoving = false;
        quack();
    }, 1000); // 1 second of inactivity triggers the quack
});

// Function to move the duckling towards the cursor
function moveDuckling() {
    // Calculate distance
    let dx = mouseX - duckX;
    let dy = mouseY - duckY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Move the duckling if it's far enough from the cursor
    if (distance > 1) {
        duckX += dx * 0.05; // Adjust the 0.05 value to change speed
        duckY += dy * 0.05;

        // Update duckling position
        duckling.style.left = duckX + 'px';
        duckling.style.top = duckY + 'px';
    }

    // Request the next animation frame
    requestAnimationFrame(moveDuckling);
}

// Function to create a trail dot at the duckling's position
function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    document.body.appendChild(dot);

    // Remove the dot after a certain time
    setTimeout(() => {
        dot.remove();
    }, 2000); // Dot lasts for 2 seconds
}

// Function to play the quack sound
function quack() {
    if (quackSound) {
        quackSound.play();
    }
}

// Start moving the duckling
moveDuckling();
