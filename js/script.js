
// Greeting + State

const greeting = document.getElementById("greeting");
let visitorName = localStorage.getItem("visitorName");

if (!visitorName) {
  visitorName = prompt("Welcome! What's your name?");
  if (visitorName) {
    localStorage.setItem("visitorName", visitorName);
  }
}

const hour = new Date().getHours();
let timeGreeting =
  hour < 12 ? "Good Morning ☀️" :
  hour < 18 ? "Good Afternoon 🌤️" :
  "Good Evening 🌙";

greeting.textContent = `${timeGreeting}, ${visitorName}!`;



// Contact Form Validation
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before submitting.");
  } else {
    alert("Your message has been sent successfully.");
    form.reset();
  }
});



// Quotes API

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

async function getQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();

    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch {
    quoteText.textContent = "Could not fetch a quote.";
  }
}

getQuote();


// Project Filter

const levelSelect = document.getElementById("level");
const projects = document.querySelectorAll(".project");

levelSelect.addEventListener("change", () => {
  const selectedLevel = levelSelect.value;

  projects.forEach(project => {
    const level = project.getAttribute("project-level");
    project.style.display =
      selectedLevel === "all" || selectedLevel === level
        ? "block"
        : "none";
  });
});



// Modal
const projectTitles = document.querySelectorAll(".project-title");
const modal = document.getElementById("project-modal");
const modalLogo = document.getElementById("modal-logo");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPhoto = document.getElementById("modal-photo");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".modal .close");

projectTitles.forEach(title => {
  title.addEventListener("click", () => {
    const project = title.parentElement;
    modalLogo.src = project.getAttribute("project-logo");
    modalTitle.textContent = project.getAttribute("project-title");
    modalDescription.innerHTML = project.getAttribute("project-description");


    const photo = project.getAttribute("project-photo");
    if (photo) {
      modalPhoto.src = photo;
      modalPhoto.style.display = "block";
    } else {
      modalPhoto.style.display = "none";
    }

    const link = project.getAttribute("project-link");
    if (link) {
      modalLink.href = link;
      modalLink.style.display = "inline-flex";
    } else {
      modalLink.style.display = "none";
    }

    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});
