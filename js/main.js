window.onload = function () {
    // Add the 'show' class after the window loads to trigger animations
    setTimeout(function () {
        document.querySelector('.wrap').classList.add('show');
    }, 100);

    // Trigger the fade-in of the Experience section after the main card animation finishes
    setTimeout(function () {
        document.querySelector('.Experience').classList.add('show');
    }, 1500); // Adjust this time if necessary, based on the length of the main card animation
};
