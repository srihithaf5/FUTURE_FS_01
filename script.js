/* ==================================
   MOBILE MENU
================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/* ==================================
   DARK MODE TOGGLE
================================== */

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = darkModeBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "dark");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "light");
    }

});


/* ==================================
   LOAD SAVED THEME
================================== */

window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        darkModeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

});


/* ==================================
   TYPING EFFECT
================================== */

const words = [
    "Full Stack Developer",
    "React Developer",
    "Python Programmer",
    "Machine Learning Enthusiast",
    "Cyber Security Explorer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingText =
    document.getElementById("typing-text");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex === words.length) {

                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect,
        deleting ? 50 : 120);
}

typeEffect();


/* ==================================
   PROFILE IMAGE PREVIEW
================================== */

const profileUpload =
    document.getElementById("profileUpload");

const profilePreview =
    document.getElementById("profilePreview");

profileUpload.addEventListener("change",
    function () {

        const file = this.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = function (e) {

                profilePreview.src =
                    e.target.result;

                localStorage.setItem(
                    "profileImage",
                    e.target.result
                );

            }

            reader.readAsDataURL(file);

        }

    });


/* ==================================
   LOAD SAVED PROFILE IMAGE
================================== */

window.addEventListener("load", () => {

    const savedImage =
        localStorage.getItem("profileImage");

    if (savedImage) {

        profilePreview.src = savedImage;
    }

});


/* ==================================
   PROJECT FILTER
================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active"));

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        projectCards.forEach(card => {

            const category =
                card.getAttribute("data-category");

            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";
            }

        });

    });

});


/* ==================================
   SCROLL REVEAL ANIMATION
================================== */

const hiddenElements =
    document.querySelectorAll(
        ".section, .project-card, .skill-card"
    );

hiddenElements.forEach(el => {

    el.classList.add("hidden");

});

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.1
    }

);

hiddenElements.forEach(el => {

    observer.observe(el);

});


/* ==================================
   ACTIVE NAVBAR LINK
================================== */

const sections =
    document.querySelectorAll("section");

const navItems =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop
            &&
            pageYOffset <
            sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === `#${current}`
        ) {

            link.classList.add("active");
        }

    });

});


/* ==================================
   PROJECT GALLERY MODAL
================================== */

/* ==================================
   PROJECT GALLERY MODAL
================================== */

const modal =
    document.getElementById("galleryModal");

const modalImg =
    document.getElementById("modalImage");

const closeModal =
    document.querySelector(".close-modal");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("prevBtn");

let currentImages = [];
let currentIndex = 0;

const projectImages = {

    garbage: [
        "assets/images/garbage-monitoring-1.jpg",
        "assets/images/garbage-monitoring-2.jpg"
    ],

    scheme: [
        "assets/images/scheme1.jpg",
        "assets/images/scheme2.jpg"
    ],

    shadow: [
        "assets/images/shadow1.jpg",
        "assets/images/shadow2.jpg"
    ],

    plant: [
        "assets/images/plant1.jpg",
        "assets/images/plant2.jpg"
    ],

    task: [
        "assets/images/task1.jpg",
        "assets/images/task2.jpg"
    ]

};

document
    .querySelectorAll(".view-gallery-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const project =
                button.dataset.project;

            currentImages =
                projectImages[project];

            currentIndex = 0;

            modalImg.src =
                currentImages[currentIndex];

            modal.style.display = "flex";

        });

    });

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= currentImages.length) {

            currentIndex = 0;

        }

        modalImg.src =
            currentImages[currentIndex];

    });

}

if (prevBtn) {

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                currentImages.length - 1;

        }

        modalImg.src =
            currentImages[currentIndex];

    });

}

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", e => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});





/* ==================================
   FUTURE IMPROVEMENTS
==================================

1. Multiple screenshots per project
2. Image slider in modal
3. GitHub API integration
4. Visitor counter
5. Download certificate section
6. Blog section
7. Resume viewer modal

================================== */