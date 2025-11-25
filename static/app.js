let mainCard = document.querySelector('.main-card');
let nextCard = document.querySelector('.next-card');

let confirmImage = document.querySelector('.confirm-image');
let decline = document.querySelector('.decline-image');

const stateTouch = { isActive: false, currentX: 0, startTime: 0, startX: 0 };
const thresholdsTouch = { rotateThreshold: 25, rotateAngle: 4, deltaThreshold: 50 };

const backgroundColors = {
    0: ['#ce0000', '#5d0f0f'],
    1: ['#ce7c00', '#5d3e0f'],
    2: ['#d4b81e', '#947717'],
    3: ['#048000', '#0f5d15'],
    4: ['#0080ce', '#0f3f5d'],
    5: ['#004068', '#0a2a3d'],
    6: ['#4b007c', '#2a0046']
};

let direction = 0;
let animationId = null;
let isSwiping = false;

let mainBackgroundColor = '';
let mainBorderColor = '';

let nextBackgroundColor = '';
let nextBorderColor = '';

function applyActiveStyles(card) {
    card.style.transform = 'translateY(-20px) scale(1.01)';
    card.style.backgroundColor = mainBackgroundColor;
    card.style.boxShadow = `0 0 40px 4px ${mainBorderColor}`;
}

function applyInactiveStyles(card) {
    card.style.transform = 'rotate(0deg)';
    card.style.boxShadow = 'none';
    card.style.backgroundColor = mainBorderColor;

    confirmImage.style.opacity = '0';
    decline.style.opacity = '0';
}

function setMainColor(card) {
    let color = Math.floor(Math.random() * 7);

    mainBackgroundColor = backgroundColors[color][0];
    mainBorderColor = backgroundColors[color][1];

    card.style.backgroundColor = backgroundColors[color][1];
    card.style.borderColor = backgroundColors[color][0];
}

function setNextColor(card) {
    let color = Math.floor(Math.random() * 7);

    nextBackgroundColor = backgroundColors[color][0];
    nextBorderColor = backgroundColors[color][1];

    card.style.backgroundColor = backgroundColors[color][1];
    card.style.borderColor = backgroundColors[color][0];
}

function addEventListeners(card) {
    card.addEventListener('touchstart', startTouch);
    card.addEventListener('touchmove', moveTouch);
    card.addEventListener('touchend', stopTouch);
    card.addEventListener('touchcancel', stopTouch);
}

function moveNextCard() {
    setTimeout(() => {
        nextCard.style.opacity = '1';
        nextCard.style.transform = 'rotate(0deg) translateY(10px)';
    }, 60);
}

function showConfirmImage() {
    setTimeout(() => {
        confirmImage.style.opacity = '1';
        decline.style.opacity = '0';
    }, 20);
}

function showDeclineImage() {
    setTimeout(() => {
        confirmImage.style.opacity = '0';
        decline.style.opacity = '1';
    }, 20);
}

function hideAllImage() {
    setTimeout(() => {
        confirmImage.style.opacity = '0';
        decline.style.opacity = '0';
    }, 20);
}

function swipeCard(direction) {
    if (isSwiping) return;
    isSwiping = true;

    const screenWidth = window.innerWidth;
    const translateX = direction == 4 ? screenWidth : -screenWidth;
    
    mainCard.style.transform = `translateX(${translateX}px) rotate(${direction}deg)`;
    nextCard.style.transform = 'rotate(0deg)';

    setTimeout(() => {
        stateTouch.isActive = false

        if (animationId) cancelAnimationFrame(animationId);

        const newCard = document.createElement('div');
        mainCard.remove();

        mainBackgroundColor = nextBackgroundColor;
        mainBorderColor = nextBorderColor;

        nextCard.innerHTML = '<div class="confirm-image"><img src="./static/images/confirm.svg" alt=""></div><div class="decline-image"><img src="./static/images/decline.svg" alt=""></div>';
        newCard.innerHTML = '<div class="confirm-image"><img src="./static/images/confirm.svg" alt=""></div><div class="decline-image"><img src="./static/images/decline.svg" alt=""></div>';
        
        newCard.className = 'next-card';
        nextCard.className = 'main-card';

        document.body.appendChild(newCard);
        newCard.style.opacity = '0';

        mainCard = document.querySelector('.main-card');
        nextCard = document.querySelector('.next-card');
        confirmImage = document.querySelector('.confirm-image');
        decline = document.querySelector('.decline-image');
        
        addEventListeners(mainCard);
        setNextColor(nextCard);
        moveNextCard();

        isSwiping = false; 
    }, 100);
}

function startInteraction(state, thresholds, getX) {
    state.isActive = true;
    state.currentX = getX();
    state.startTime = Date.now();
    state.startX = state.currentX;
    state.isActive = true;
    
    direction = 0;

    function animate() {
        if (!state.isActive) return;

        const centerX = window.innerWidth / 2;
        const relativeX = state.currentX - centerX;

        if (relativeX < -thresholds.rotateThreshold) {
            direction = -thresholds.rotateAngle;
            showDeclineImage();
        } else if (relativeX > thresholds.rotateThreshold) {
            direction = thresholds.rotateAngle;
            showConfirmImage();
        }
        else {
            direction = 0;
            hideAllImage();
        }

        mainCard.style.transform = `translateY(-20px) scale(1.01) rotate(${direction}deg)`;
        animationId = requestAnimationFrame(animate);
    }

    applyActiveStyles(mainCard);
    animate();
}

function stopInteraction(state, isLeave = false) {
    state.isActive = false;
    if (animationId) cancelAnimationFrame(animationId);

    if (direction == 0 || isLeave) {
        setTimeout(() => {
            applyInactiveStyles(mainCard);
        }, 200);
    } else {
        setTimeout(() => {
            swipeCard(direction);
        }, 50);
    }
}

function startTouch(event) {
    startInteraction(stateTouch, thresholdsTouch, () => event.touches[0].clientX);
}

function moveTouch(event) {
    if (stateTouch.isActive) stateTouch.currentX = event.touches[0].clientX;
}

function stopTouch(event) {
    stopInteraction(stateTouch, event.type === 'touchcancel' || event.type === 'touchend' ? false : true);
}

setMainColor(mainCard);
setNextColor(nextCard);
moveNextCard();

document.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
document.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', ' ', 'PageDown', 'PageUp'].includes(e.key)) {
        e.preventDefault();
    }
});

mainCard.addEventListener('touchstart', startTouch);
mainCard.addEventListener('touchmove', moveTouch);
mainCard.addEventListener('touchend', stopTouch);
mainCard.addEventListener('touchcancel', stopTouch);