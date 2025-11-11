const mainCard = document.querySelector('.main-card');

mainCard.addEventListener('mousemove', (event) => {
    const centerX = window.innerWeight / 2;
    const relativeX = event.clientX - centerX;

    console.log(`X: ${relativeX}`)
});