const mainCard = document.querySelector('.main-card');

let isDragging = false;
let animationId = null;
let currentX = 0;

function startDrag(event) {
    isDragging = true;
    event.preventDefault();

    currentX = event.touches[0].clientX;
    mainCard.style.boxShadow = '0 0 40px 4px #0080ce60';
    mainCard.style.transition = 'none';

    function animate() {
        if (!isDragging) return;
        
        const centerX = window.innerWidth / 2;
        const relativeX = currentX - centerX;

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

function moveDrag(event) {
    if (isDragging) {
        event.preventDefault();
        currentX = event.touches[0].clientX;
    }
}

function stopDrag() {
    isDragging = false;

    mainCard.style.transform = 'translateX(0px) rotate(0deg)';
    mainCard.style.boxShadow = 'none';
    mainCard.style.transition = 'all 0.4s ease';

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

mainCard.addEventListener('touchstart', startDrag, { passive: false });
mainCard.addEventListener('touchmove', moveDrag, { passive: false });
mainCard.addEventListener('touchend', stopDrag);
mainCard.addEventListener('touchcancel', stopDrag);