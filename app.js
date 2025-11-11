document.addEventListener('mousemove', function (event) {
    const centerX = window.innerWidth / 2;
    const relativeX = event.clientX - centerX;
    
    console.log(relativeX);
});