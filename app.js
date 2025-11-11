document.addEventListener('mousemove', function(event) {
    const centerX = window.innerWeight / 2;
    const relativeX = event.clientX - centerX;

    console.log(`X: ${relativeX}`)
});