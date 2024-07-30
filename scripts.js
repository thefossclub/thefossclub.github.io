document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mainTitle = document.getElementById("mainTitle");
  const joinForm = document.getElementById("join-form");

  // Dark mode toggle
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLightMode = body.classList.contains("light-mode");
    localStorage.setItem("lightMode", isLightMode);
    updateModeIcon(isLightMode);
  });

  const savedLightMode = localStorage.getItem("lightMode");
  if (savedLightMode === "true") {
    body.classList.add("light-mode");
    updateModeIcon(true);
  }

  function updateModeIcon(isLightMode) {
    const icon = darkModeToggle.querySelector("i");
    icon.className = isLightMode ? "fas fa-sun" : "fas fa-moon";
  }

  // Mobile navigation toggle
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Glitch effect on main title
  mainTitle.addEventListener("click", glitchEffect);
  mainTitle.addEventListener("mouseover", glitchEffect);

  function glitchEffect() {
    const glitchText = "Welcome to the FOSS Club!";
    const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
    let iterations = 0;

    const interval = setInterval(() => {
      mainTitle.textContent = glitchText
        .split("")
        .map((char, index) => {
          if (index < iterations) {
            return glitchText[index];
          }
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join("");

      if (iterations >= glitchText.length) {
        clearInterval(interval);
        mainTitle.textContent = glitchText;
      }

      iterations += 1 / 3;
    }, 30);
  }

  // Join form submission
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for your interest! We'll get back to you soon.");
    joinForm.reset();
  });

  // Team members data
  const teamMembers = [
    { name: "John Doe", role: "President", image: "/api/placeholder/150/150" },
    {
      name: "Jane Smith",
      role: "Vice President",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Mike Johnson",
      role: "Secretary",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Emily Brown",
      role: "Treasurer",
      image: "/api/placeholder/150/150",
    },
  ];

  // Populate team members
  const teamGrid = document.querySelector(".team-grid");
  teamMembers.forEach((member) => {
    const memberElement = document.createElement("div");
    memberElement.className = "team-member";
    memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
        `;
    teamGrid.appendChild(memberElement);
  });
});

const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
});

// Check for saved dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark-mode");
}
