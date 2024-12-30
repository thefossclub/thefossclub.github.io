document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mainTitle = document.getElementById("mainTitle");
  const joinForm = document.getElementById("join-form");
  const slideshows = document.querySelectorAll(".event-slideshow");

slideshows.forEach((slideshow) => {
  const slides = slideshow.querySelectorAll(".slide");
  let currentSlide = 0;

  // Function to show the specified slide
  function showSlide(index) {
    // Ensure the index wraps around if out of bounds
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.style.display = i === currentSlide ? "block" : "none";
    });
  }

  // Initial display setup
  showSlide(currentSlide);

  // Event listeners for the navigation buttons
  const prevButton = slideshow.querySelector(".prev");
  const nextButton = slideshow.querySelector(".next");

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showSlide(currentSlide - 1); // Navigate to the previous slide
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showSlide(currentSlide + 1); // Navigate to the next slide
    });
  }
});



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
  mainTitle.addEventListener("mouseover", glitchEffect);

  function glitchEffect() {
      const glitchText = "Welcome to The FOSS Club!";
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
  if (joinForm) {
      joinForm.addEventListener("submit", (e) => {
          e.preventDefault();
          alert("Thanks for your interest! We'll get back to you soon.");
          joinForm.reset();
      });
  }

  // Intersection Observer for animations
  const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .event-card,.event-slideshow .blog-post, .tool-card, .member-card').forEach(el => {
      animateOnScroll.observe(el);
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const mainTitle = document.getElementById("mainTitle");
    const joinForm = document.getElementById("join-form");

    
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
    if (joinForm) {
        joinForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thanks for your interest! We'll get back to you soon.");
            joinForm.reset();
        });
    }

    // Intersection Observer for animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .event-item, .blog-post, .tool-card, .member-card').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Slideshow Functionality
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.querySelectorAll('.slide');
        slides.forEach(slide => slide.style.display = "none");
        
        slideIndex++;
        
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    window.plusSlides = function(n) {
        slideIndex += n;
        let slides = document.querySelectorAll('.slide');
        
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        if (slideIndex < 1) {
            slideIndex = slides.length;
        }

        showSlides();
    };
})
})