window.onload = function () {
    // Add the 'show' class after the window loads to trigger animations
    setTimeout(function () {
        document.querySelector('.wrap').classList.add('show');
    }, 100);

    // Trigger the fade-in of the Experience section after the main card animation finishes
    setTimeout(function () {
        document.querySelector('.Experience').classList.add('show');
    }, 10);

    // Company buttons functionality
    const buttons = document.querySelectorAll(".companies .buttons button");

    if (buttons.length > 0) {
        // Set the first button as active by default
        buttons[0].classList.add("active");
        buttons[0].querySelector(".arrow").style.display = "inline-block";
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons and hide all arrows
            buttons.forEach(btn => {
                btn.classList.remove("active");
                btn.querySelector(".arrow").style.display = "none";
            });

            // Add active class to the clicked button
            this.classList.add("active");
            this.querySelector(".arrow").style.display = "inline-block";
        });
    });
};
