const mainCard = document.querySelector('.main-card');

const stateMouse = { isActive: false, currentX: 0, startTime: 0, startX: 0 };
const stateTouch = { isActive: false, currentX: 0, startTime: 0, startX: 0 };

const thresholdsMouse = { rotateThreshold: 45, rotateAngle: 2, deltaThreshold: 50, speedThreshold: 0.5 };
const thresholdsTouch = { rotateThreshold: 25, rotateAngle: 4, deltaThreshold: 50, speedThreshold: 0.3 };

const activeStyles = {
    transform: 'translateY(-20px) scale(1.02)',
    boxShadow: '0 0 40px 4px #0080ce60',
    backgroundColor: '#0080ce'
};

const inactiveStyles = {
    transform: 'rotate(0deg)',
    boxShadow: 'none',
    backgroundColor: '#0080ce60'
};

function applyStyles(card, styles) {
    Object.assign(card.style, styles);
}

function startInteraction(state, thresholds, getX) {
    state.isActive = true;
    state.currentX = getX();
    state.startTime = Date.now();
    state.startX = state.currentX;

    applyStyles(mainCard, activeStyles);

    function animate() {
        if (!state.isActive) return;

        const centerX = window.innerWidth / 2;
        const relativeX = state.currentX - centerX;
        let rotation = 0;

        if (relativeX < -thresholds.rotateThreshold) {
            rotation = -thresholds.rotateAngle;
        } else if (relativeX > thresholds.rotateThreshold) {
            rotation = thresholds.rotateAngle;
        }

        mainCard.style.transform = `translateY(-20px) scale(1.02) rotate(${rotation}deg)`;
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

function stopInteraction(state, thresholds) {
    state.isActive = false;

    setTimeout(() => {
        applyStyles(mainCard, inactiveStyles);
    }, 200);

    if (animationId) cancelAnimationFrame(animationId);

    const deltaTime = Date.now() - state.startTime;
    const deltaX = state.currentX - state.startX;
    const speed = Math.abs(deltaX) / deltaTime;

    if (Math.abs(deltaX) > thresholds.deltaThreshold && speed > thresholds.speedThreshold) {
        const rotation = deltaX > 0 ? thresholds.rotateAngle : -thresholds.rotateAngle;
        
        applyStyles(mainCard, { ...activeStyles, transform: `translateY(-20px) scale(1.02) rotate(${rotation}deg)` });
    }
}
let animationId = null;

function startMouse(event) {
    startInteraction(stateMouse, thresholdsMouse, () => event.clientX);
}

function startTouch(event) {
    startInteraction(stateTouch, thresholdsTouch, () => event.touches[0].clientX);
}

function moveMouse(event) {
    if (stateMouse.isActive) stateMouse.currentX = event.clientX;
}

function moveTouch(event) {
    if (stateTouch.isActive) stateTouch.currentX = event.touches[0].clientX;
}

function stopMouse() {
    stopInteraction(stateMouse, thresholdsMouse);
}

function stopTouch() {
    stopInteraction(stateTouch, thresholdsTouch);
}

document.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
document.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', ' ', 'PageDown', 'PageUp'].includes(e.key)) {
        e.preventDefault();
    }
});

mainCard.addEventListener('mousedown', startMouse);
mainCard.addEventListener('mousemove', moveMouse);
mainCard.addEventListener('mouseup', stopMouse);
mainCard.addEventListener('mouseleave', stopMouse);

mainCard.addEventListener('touchstart', startTouch);
mainCard.addEventListener('touchmove', moveTouch);
mainCard.addEventListener('touchend', stopTouch);
mainCard.addEventListener('touchcancel', stopTouch);