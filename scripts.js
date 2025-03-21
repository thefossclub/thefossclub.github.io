document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle")
    const body = document.body
    const navToggle = document.querySelector(".nav-toggle")
    const navLinks = document.querySelector(".nav-links")
    const mainTitle = document.getElementById("mainTitle")
    const joinForm = document.getElementById("join-form")
    const slideshows = document.querySelectorAll(".event-slideshow")
  
    slideshows.forEach((slideshow) => {
      const slides = slideshow.querySelectorAll(".slide")
      let currentSlide = 0
  
      function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length
  
        slides.forEach((slide, i) => {
          slide.style.display = i === currentSlide ? "block" : "none"
        })
      }
  
      showSlide(currentSlide)
  
      const prevButton = slideshow.querySelector(".prev")
      const nextButton = slideshow.querySelector(".next")
  
      if (prevButton) {
        prevButton.addEventListener("click", () => {
          showSlide(currentSlide - 1)
        })
      }
  
      if (nextButton) {
        nextButton.addEventListener("click", () => {
          showSlide(currentSlide + 1)
        })
      }
    })
  
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("light-mode")
      const isLightMode = body.classList.contains("light-mode")
      localStorage.setItem("lightMode", isLightMode)
      updateModeIcon(isLightMode)
    })
  
    const savedLightMode = localStorage.getItem("lightMode")
    if (savedLightMode === "true") {
      body.classList.add("light-mode")
      updateModeIcon(true)
    }
  
    function updateModeIcon(isLightMode) {
      const icon = darkModeToggle.querySelector("i")
      icon.className = isLightMode ? "fas fa-sun" : "fas fa-moon"
    }
  
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
    })
  
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    mainTitle.addEventListener("mouseover", glitchEffect)
  
    function glitchEffect() {
      const glitchText = "Welcome to The FOSS Club!"
      const glitchChars = "!<>-_\\/[]{}—=+*^?#________"
      let iterations = 0
  
      const interval = setInterval(() => {
        mainTitle.textContent = glitchText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return glitchText[index]
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join("")
  
        if (iterations >= glitchText.length) {
          clearInterval(interval)
          mainTitle.textContent = glitchText
        }
  
        iterations += 1 / 3
      }, 30)
    }
  
    if (joinForm) {
      joinForm.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("Thanks for your interest! We'll get back to you soon.")
        joinForm.reset()
      })
    }
  
    const animateOnScroll = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )
  
    document
      .querySelectorAll(".project-card, .event-card,.event-slideshow .blog-post, .tool-card, .member-card")
      .forEach((el) => {
        animateOnScroll.observe(el)
      })
  
    const sectionTitles = document.querySelectorAll(".section-title")
  
    sectionTitles.forEach((title) => {
      title.addEventListener("click", () => {
        const memberGrid = title.nextElementSibling
        memberGrid.classList.toggle("hidden")
      })
    })
  })
  
  