const mainCard = document.querySelector('.main-card');

let isMouseDown = false;
let animationId = null;
let currentMouseX = 0;
let isTouching = false;
let currentTouchX = 0;

let touchStartTime = 0;
let touchStartX = 0;
let mouseStartTime = 0;
let mouseStartX = 0;

function startTouch(event) {
    isTouching = true;
    currentTouchX = event.touches[0].clientX;
    touchStartTime = Date.now();
    touchStartX = currentTouchX;

    mainCard.style.boxShadow = '0 0 40px 4px #0080ce60';
    mainCard.style.backgroundColor = '#0080ce60';
    
    function animate() {
        if (!isTouching) return;
        
        const centerX = window.innerWidth / 2;
        const relativeX = currentTouchX - centerX;
        
        if (relativeX < -25) {
            mainCard.style.transform = 'rotate(-4deg)';
        }
        else if (relativeX > 25) {
            mainCard.style.transform = 'rotate(4deg)';
        }
        else {
            mainCard.style.transform = 'rotate(0deg)';
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

function startMouse(event) {
    isMouseDown = true;
    currentMouseX = event.clientX;
    mouseStartTime = Date.now();
    mouseStartX = currentMouseX;

    mainCard.style.boxShadow = '0 0 40px 4px #0080ce60';
    mainCard.style.backgroundColor = '#0080ce';
    
    function animate() {
        if (!isMouseDown) return;
        
        const centerX = window.innerWidth / 2;
        const relativeX = currentMouseX - centerX
        
        if (relativeX < -45) {
            mainCard.style.transform = 'rotate(-2deg)';
        }
        else if (relativeX > 45) {
            mainCard.style.transform = 'rotate(2deg)';
        }

        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

function moveTouch(event) {
    if (isTouching) {
        currentTouchX = event.touches[0].clientX;
    }
}

function moveMouse(event) {
    if (isMouseDown) {
        currentMouseX = event.clientX;
    }
}

function stopTouch() {
    isTouching = false;

    mainCard.style.transform = 'rotate(0deg)';
    mainCard.style.boxShadow = 'none';
    mainCard.style.backgroundColor = '#0080ce60';

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    const deltaTime = Date.now() - touchStartTime;
    const deltaX = currentTouchX - touchStartX;
    const speed = Math.abs(deltaX) / deltaTime;

    if (Math.abs(deltaX) > 50 && speed > 0.3) {
        if (deltaX > 0) {
            mainCard.style.transform = 'rotate(2deg)';
        } else {
            mainCard.style.transform = 'rotate(-2deg)';
        }
        mainCard.style.boxShadow = '0 0 40px 4px #0080ce60';
        mainCard.style.backgroundColor = '#0080ce';

        setTimeout(() => {
            mainCard.style.transform = 'rotate(0deg)';
            mainCard.style.boxShadow = 'none';
            mainCard.style.backgroundColor = '#0080ce60';
        }, 200);
    }
}

function stopMouse() {
    isMouseDown = false;

    mainCard.style.transform = 'rotate(0deg)';
    mainCard.style.boxShadow = 'none';
    mainCard.style.backgroundColor = '#0080ce60';

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    const deltaTime = Date.now() - mouseStartTime;
    const deltaX = currentMouseX - mouseStartX;
    const speed = Math.abs(deltaX) / deltaTime;

    if (Math.abs(deltaX) > 50 && speed > 0.5) {
        if (deltaX > 0) {
            mainCard.style.transform = 'rotate(2deg)';
        } else {
            mainCard.style.transform = 'rotate(-2deg)';
        }
        mainCard.style.boxShadow = '0 0 40px 4px #0080ce60';
        mainCard.style.backgroundColor = '#0080ce';

        setTimeout(() => {
            mainCard.style.transform = 'rotate(0deg)';
            mainCard.style.boxShadow = 'none';
            mainCard.style.backgroundColor = '#0080ce60';
        }, 200);
    }
}

document.addEventListener('wheel', (e) => {
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });

document.addEventListener('keydown', (e) => {
  if (
    e.key === 'ArrowDown' || 
    e.key === 'ArrowUp' || 
    e.key === ' ' || 
    e.key === 'PageDown' || 
    e.key === 'PageUp'
  ) {
    e.preventDefault();
  }
});

mainCard.addEventListener('touchstart', startTouch);
mainCard.addEventListener('touchmove', moveTouch);
mainCard.addEventListener('touchend', stopTouch);
mainCard.addEventListener('touchcancel', stopTouch);

mainCard.addEventListener('mousedown', startMouse);
mainCard.addEventListener('mousemove', moveMouse);
mainCard.addEventListener('mouseup', stopMouse);
mainCard.addEventListener('mouseleave', stopMouse);