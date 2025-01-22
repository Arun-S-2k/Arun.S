document.addEventListener("DOMContentLoaded", function() {
    // Reset scroll position to the top of the page
    window.scrollTo(0, 0);

    // Lock scroll during animations
    document.body.classList.add('lock-scroll');

    // Initialize animations and company buttons
    initAnimations();
    initCompanyButtons();
    loadDesignationData();
});

// Function to handle animations
function initAnimations() {
    setTimeout(() => {
        document.querySelector('.wrap').classList.add('show');
    }, 100);

    setTimeout(() => {
        document.querySelector('.Experience').classList.add('show');
    }, 10);

    // Unlock scroll after animation duration
    setTimeout(() => {
        document.body.classList.remove('lock-scroll');
    }, 1200);  // Set this duration according to your animation duration
}

// Function to handle company buttons
function initCompanyButtons() {
    const buttons = document.querySelectorAll(".companies .buttons button");

    if (buttons.length > 0) {
        buttons[0].classList.add("active");
        buttons[0].querySelector(".arrow").style.display = "inline-block";
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => {
                btn.classList.remove("active");
                btn.querySelector(".arrow").style.display = "none";
            });

            this.classList.add("active");
            this.querySelector(".arrow").style.display = "inline-block";

            updateDesignation(this.getAttribute("data-company"));
        });
    });
}

// Function to load designation data
function loadDesignationData() {
    fetch("content.json")
        .then(response => response.json())
        .then(data => {
            window.designationData = data;

            // Set first company data on load
            const firstButton = document.querySelector(".companies .buttons button");
            if (firstButton) {
                updateDesignation(firstButton.getAttribute("data-company"));
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Function to update designation content
function updateDesignation(company) {
    const designationsContainer = document.querySelector(".designations");
    const data = window.designationData[company];

    if (!data) return;

    designationsContainer.innerHTML = `
        <h2>${data.title || 'No title available'}</h2>
        <p>${data.location || 'No location available'}</p>
        <p>${data.period || 'No period available'}</p>
        <div class="tools">
            ${data.tools ? data.tools.map(tool => `<span class="tool">${tool}</span>`).join('') : 'No tools available'}
        </div>
        <div class="separator"></div>
        <div class="discription">
            ${data.description ? data.description.map(desc => `<p><img src="Above title line.svg" alt="line">${desc}</p>`).join('') : 'No description available'}
        </div>
    `;
}
