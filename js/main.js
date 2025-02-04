document.addEventListener("DOMContentLoaded", function() {
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







const slider = document.querySelector(".portfolio-slider");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Function to update scroll behavior based on screen size
function updateScrollBehavior() {
    const isMobile = window.matchMedia("(max-width: 425px)").matches;
    const visibleCards = 6; // Always move 6 cards at a time (on both mobile and web)
    const itemWidth = document.querySelector(".portfolio-item").offsetWidth + 10; // Adjust for gap

    // Move cards when nav buttons are clicked
    nextBtn.onclick = () => {
        slider.scrollBy({ left: itemWidth * visibleCards, behavior: "smooth" });
    };

    prevBtn.onclick = () => {
        slider.scrollBy({ left: -itemWidth * visibleCards, behavior: "smooth" });
    };
}


// Run function initially
updateScrollBehavior();

// Update on window resize
window.addEventListener("resize", updateScrollBehavior);

// ------ DRAG FUNCTIONALITY (Added Below) ------
let isDragging = false;
let startX, scrollLeft;

slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.classList.add("dragging"); // Optional: Add visual effect
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
    isDragging = false;
    slider.classList.remove("dragging");
});

slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.classList.remove("dragging");
});

slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Adjust drag speed
    slider.scrollLeft = scrollLeft - walk;
});

// Prevent text selection while dragging
slider.style.userSelect = "none";










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

const btn = document.querySelector(".Primary-CTA");

if (btn) {
    btn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents page jump

        if (window.innerWidth <= 425) { // Mobile only
            setTimeout(() => {
                this.classList.remove("active"); // Removes active state after click
            }, 200);
        }
    });
}
