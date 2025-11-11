const mainCard = document.querySelector('.main-card');

let isMouseDown = false;
let animationId = null;
let currentMouseX = 0;

function startTouch(event) {
    isTouching = true;
    currentTouchX = event.touches[0].clientX;
    mainCard.style.boxShadow = '0 0 40px 4px #0080ce60';
    
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

function moveTouch(event) {
    if (isTouching) {
        currentTouchX = event.touches[0].clientX;
    }
}

function stopTouch() {
    isTouching = false;
    mainCard.style.transform = 'rotate(0deg)';
    mainCard.style.boxShadow = 'none';

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function startMouse(event) {
    isMouseDown = true;
    currentMouseX = event.clientX;
    mainCard.style.boxShadow = '0 0 40px 4px #0080ce60';
    
    function animate() {
        if (!isMouseDown) return;
        
        const centerX = window.innerWidth / 2;
        const relativeX = currentMouseX - centerX;
        
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

function moveMouse(event) {
    if (isMouseDown) {
        currentMouseX = event.clientX;
    }
}

function stopMouse() {
    isMouseDown = false;
    mainCard.style.transform = 'rotate(0deg)';
    mainCard.style.boxShadow = 'none';

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

mainCard.addEventListener('touchstart', startTouch);
mainCard.addEventListener('touchmove', moveTouch);
mainCard.addEventListener('touchend', stopTouch);
mainCard.addEventListener('touchcancel', stopTouch);

mainCard.addEventListener('mousedown', startMouse);
mainCard.addEventListener('mousemove', moveMouse);
mainCard.addEventListener('mouseup', stopMouse);
mainCard.addEventListener('mouseleave', stopMouse);