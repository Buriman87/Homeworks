import { readFromLS, replaceScript } from "../Utils/utils.js";

const loggedUser = readFromLS("loggedUser") || {};
if (Object.keys(loggedUser).length > 0) {
  replaceScript("./loggedIn.js", true);
} else {
  replaceScript("./notLoggedIn.js", true);
}

function renderFlatCards() {
  const cardContainer = document.getElementById("cardContainer");
  if (!cardContainer) {
    console.error("No #cardContainer found in DOM.");
    return;
  }

  cardContainer.innerHTML = "";

  const flats = JSON.parse(localStorage.getItem("flats")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  flats.forEach((flat, index) => {
    const card = document.createElement("div");
    card.classList.add("flat-card");

    // Image Container
    if (flat.uploadImg) {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("flat-image-container");

      const img = document.createElement("img");
      img.src = flat.uploadImg;
      img.alt = flat.shortName || "Flat Image";
      img.classList.add("flat-image");

      // Add click event to open modal
      img.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent accidental propagation
        openFlatModal(index);
      });

      imgContainer.appendChild(img);
      card.appendChild(imgContainer);
    }

    // Details Container
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("flat-details");

    detailsContainer.innerHTML = `
      <p><strong>Description:</strong> <span>${flat.shortName}</span></p>
      <p><strong>City:</strong> <span>${flat.city}</span></p>
      <p><strong>Street:</strong> <span>${flat.street}</span></p>
      <p><strong>Available from:</strong> <span>${flat.availableFrom}</span></p>
      <p><strong>Price:</strong> <span>${
        Object.keys(loggedUser).length > 0 ? flat.rentPrice + " €" : "•••• €"
      }</span></p>
    `;

    card.appendChild(detailsContainer);
    cardContainer.appendChild(card);
  });

  setupCardPagination(flats.length);
}

function openFlatModal(flatIndex) {
  const flats = JSON.parse(localStorage.getItem("flats")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const selectedFlat = flats[flatIndex];

  if (!selectedFlat) {
    console.error("Flat not found.");
    return;
  }

  // Find the owner (user) of the flat
  const owner = users.find((user) => user.id === selectedFlat.userId);

  // Remove existing modal if present
  const existingModal = document.getElementById("flatModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal HTML
  const modalHTML = `
      <div id="flatModal" class="modal">
          <div class="modal-content">
              <span class="close-modal">Close</span>
              <div class="favorite-container">
                  <span class="material-symbols-outlined favorite-icon">favorite</span>
              </div>
              <h2>${selectedFlat.shortName}</h2>
              <img src="${
                selectedFlat.uploadImg
              }" alt="Flat Image" class="modal-image">
              <p><strong>City:</strong> ${selectedFlat.city}</p>
              <p><strong>Street:</strong> ${selectedFlat.street}</p>
              <p><strong>Street Number:</strong> ${
                selectedFlat.streetNumber
              }</p>
              <p><strong>Available from:</strong> ${
                selectedFlat.availableFrom
              }</p>
              <p><strong>Price:</strong> ${selectedFlat.rentPrice} €</p>
              <p><strong>Area Size:</strong> ${selectedFlat.areaSize} m²</p>
              <p><strong>AC:</strong> ${selectedFlat.ac ? "Yes" : "No"}</p>
              <p><strong>Year Built:</strong> ${selectedFlat.yearBuilt}</p>
              <hr>
              <h3>Owner Information</h3>
              <p><strong>Name:</strong> ${
                owner ? owner.firstName + " " + owner.lastName : "Not available"
              }</p>
              <p><strong>Email:</strong> ${
                owner ? owner.email : "Not available"
              }</p>
              <p><strong>Phone:</strong> ${
                owner ? owner.phoneNumber : "Not available"
              }</p>
          </div>
      </div>
  `;

  // Insert modal into body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("flatModal");
  modal.style.display = "block";

  // Close modal event
  document.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
  document.querySelector(".favorite-icon").addEventListener("click", () => {
    alert("Added to Favorites!"); // Replace this with your actual favorite functionality
  });
}

// Pagination Variables
let currentPage = 0;
let CARDS_PER_PAGE = 8;

function updateCardsPerPage() {
  if (window.matchMedia("(max-width: 375px)").matches) {
    CARDS_PER_PAGE = 1;
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    CARDS_PER_PAGE = 2;
  } else {
    CARDS_PER_PAGE = 8;
  }
  updateVisibleCards(document.querySelectorAll(".flat-card").length);
}
// Function to Show Only a Certain Number of Cards Per Page
function updateVisibleCards(totalFlats) {
  const cardContainer = document.getElementById("cardContainer");
  const cards = cardContainer.querySelectorAll(".flat-card");

  cards.forEach((card) => {
    card.style.display = "none";
  });

  const startIndex = currentPage * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;

  for (let i = startIndex; i < endIndex && i < totalFlats; i++) {
    cards[i].style.display = "flex";
  }

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = endIndex >= totalFlats;
}

// Pagination Setup
function setupCardPagination(totalFlats) {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!prevBtn || !nextBtn) {
    console.error("Missing navigation arrow buttons in DOM.");
    return;
  }

  currentPage = 0;
  updateCardsPerPage();

  prevBtn.onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      updateVisibleCards(totalFlats);
    }
  };

  nextBtn.onclick = () => {
    if ((currentPage + 1) * CARDS_PER_PAGE < totalFlats) {
      currentPage++;
      updateVisibleCards(totalFlats);
    }
  };
}

// Detect screen size changes
window.addEventListener("resize", updateCardsPerPage);
window.addEventListener("DOMContentLoaded", () => {
  renderFlatCards();
  updateCardsPerPage();
});
