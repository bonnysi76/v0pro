// Hamburger Menu Toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links")
  const icon = document.querySelector(".hamburger-icon")
  menu.classList.toggle("open")
  icon.classList.toggle("open")
}

// Initialize Typed.js for typewriter effect in the profile section
const typed = new Typed("#typed", {
  strings: ["Software Developer", "Security and Network Engineer"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
})

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
})

// Custom Cursor Movement
const cursor = document.querySelector(".custom-cursor")
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`
  cursor.style.top = `${e.clientY}px`
})

// GSAP Hover Effects for Project Cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { scale: 1.05, ease: "power1.out", duration: 0.3 })
  })
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { scale: 1, ease: "power1.out", duration: 0.3 })
  })
})

// ========== THEME TOGGLE FUNCTIONALITY ========== //
const body = document.body
const themeToggle = document.getElementById("themeToggle")

// Define themes and icons
const themes = ["white-theme", "dark-theme", "blue-black-theme"]
const icons = ["🌞", "🌙", "💻"]

// Load saved theme from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme")
  let index = themes.indexOf(savedTheme)
  if (index === -1) {
    index = 0 // default to white-theme
    savedTheme = themes[index]
  }
  body.classList.add(savedTheme)
  themeToggle.innerText = icons[index]

  // Initialize project carousel
  initCarousel()
})

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = themes.find((t) => body.classList.contains(t))
  const newIndex = (themes.indexOf(currentTheme) + 1) % themes.length

  // Remove existing theme classes
  themes.forEach((t) => body.classList.remove(t))

  // Set new theme
  const newTheme = themes[newIndex]
  body.classList.add(newTheme)
  themeToggle.innerText = icons[newIndex]
  localStorage.setItem("theme", newTheme)
})

// ========== PROJECT CAROUSEL FUNCTIONALITY ========== //
function initCarousel() {
  const carouselSlides = document.querySelector(".carousel-slides")
  const slides = document.querySelectorAll(".project-card")
  const dotsContainer = document.querySelector(".carousel-dots")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  if (!carouselSlides || slides.length === 0) return

  let currentIndex = 0
  const slideWidth = 100 // percentage

  // Set initial width for slides container and individual slides
  carouselSlides.style.width = `${slides.length * 100}%`
  slides.forEach((slide) => {
    slide.style.width = `${slideWidth / slides.length}%`
  })

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => goToSlide(index))
    dotsContainer.appendChild(dot)
  })

  // Navigation functions
  function updateSlidePosition() {
    carouselSlides.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`

    // Update dots
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex)
    })
  }

  function goToSlide(index) {
    currentIndex = index
    updateSlidePosition()
  }

  function goToNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length
    updateSlidePosition()
  }

  function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    updateSlidePosition()
  }

  // Event listeners
  prevBtn.addEventListener("click", goToPrevSlide)
  nextBtn.addEventListener("click", goToNextSlide)

  // Auto-advance carousel every 5 seconds
  setInterval(goToNextSlide, 5000)
}
