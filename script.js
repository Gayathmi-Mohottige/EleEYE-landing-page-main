document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("x-icon");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar a");

    // Function to check mobile view
    const isMobile = () => window.innerWidth <= 768;

    // Open Menu (mobile only)
    menuIcon.addEventListener("click", () => {
        if (isMobile()) {
            navbar.classList.add("active");
            menuIcon.style.display = "none";
            closeIcon.style.display = "block";
        }
    });

    // Close Menu (mobile only)
    closeIcon.addEventListener("click", () => {
        if (isMobile()) {
            navbar.classList.remove("active");
            menuIcon.style.display = "block";
            closeIcon.style.display = "none";
        }
    });

    // Close menu when link clicked (mobile only)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (isMobile()) {
                navbar.classList.remove("active");
                menuIcon.style.display = "block";
                closeIcon.style.display = "none";
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const fullText = ["Your Safety,", " Their Survival."]; // Separate text parts
    const typingElement = document.getElementById("typing-effect");
    let index = 0;
    let part = 0;

    function type() {
        if (part < fullText.length) {
            if (index < fullText[part].length) {
                typingElement.innerHTML = 
                    (part === 0 ? fullText[0].substring(0, index + 1) : fullText[0]) + 
                    (part === 1 ? `<span class="highlight">${fullText[1].substring(0, index + 1)}</span>` : '') + 
                    '<span class="cursor">|</span>';
                index++;
                setTimeout(type, 150);
            } else {
                index = 0;
                part++;
                if (part < fullText.length) {
                    setTimeout(type, 400);
                } else {
                    setTimeout(() => {
                        document.querySelector(".cursor").remove(); // Remove cursor after typing finishes
                    }, 600);
                }
            }
        }
    }

    type();
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    
    const startCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = target / 100; // Controls speed

        const updateCounter = () => {
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target; // Ensure the final value is correct
            }
        };
        
        updateCounter();
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target); // Stop observing once started
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

let cards = document.querySelectorAll(".card");
let stackArea = document.querySelector(".stack-area");

function rotateCards() {
    let angle = 0;
    cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
            card.style.transform = `translateY(-${120 + (index * 20)}vh) rotate(-${48 + (index * 4)}deg)`;
        } else {
            card.style.transform = `rotate(${angle}deg)`;
            angle = angle - 6; // Reduced angle for better spacing
            card.style.zIndex = cards.length - index;
        }
    });
}

rotateCards();

window.addEventListener("scroll", () => {
    let distance = window.innerHeight * 0.3; // Reduced distance for better sensitivity
    let topVal = stackArea.getBoundingClientRect().top;
    let index = Math.floor(-1 * (topVal / distance + 1));

    // Update all cards
    cards.forEach((card, i) => {
        card.classList.toggle("away", i <= index);
        card.classList.toggle("current", i === index);
    });
    
    rotateCards();
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector("#about");
    const teamCards = document.querySelectorAll(".team-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.style.opacity = "1";
                aboutSection.style.transform = "translateY(0)";
                teamCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, index * 200); // Delay each card animation
                });
                observer.unobserve(aboutSection);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(aboutSection);
});
