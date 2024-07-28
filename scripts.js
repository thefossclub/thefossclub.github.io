document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    updateDarkModeIcon(isDarkMode);
  });

  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode === "true") {
    body.classList.add("dark-mode");
    updateDarkModeIcon(true);
  }

  function updateDarkModeIcon(isDarkMode) {
    const icon = darkModeToggle.querySelector("i");
    icon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const heroText = document.querySelector(".hero p");
  const text = heroText.textContent;
  heroText.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  typeWriter();

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector(".hero");
    hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";
  });

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  const joinForm = document.getElementById("join-form");
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Thanks for your interest! We'll get back to you soon.");
    joinForm.reset();
  });

  const mainTitle = document.querySelector(".hero h1");
  mainTitle.addEventListener("mouseover", glitchEffect);
  mainTitle.addEventListener(
    "mouseout",
    () => (mainTitle.textContent = "Welcome to the FOSS Club"),
  );

  function glitchEffect() {
    const glitchText = "Welcome to the FOSS Club";
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

      if (iterations >= glitchText.length) clearInterval(interval);

      iterations += 1 / 2;
    }, 50);
  }
});
