import {
  readFromLS,
  replaceScript,
  toggleFavorite,
  CHECK_INTERVAL,
  logoutInvalidSession,
  logOutTime,
} from "../Utils/utils.js";

const loggedUser = readFromLS("loggedUser") || {};
if (Object.keys(loggedUser).length > 0) {
  replaceScript("./loggedIn.js", true);
} else {
  replaceScript("./notLoggedIn.js", true);
}
setInterval(() => {
  logoutInvalidSession(loggedUser);
}, CHECK_INTERVAL);

const logo = document.getElementById("logoIcon");
const reloadPage = logo.addEventListener("click", () => {
  window.location.assign("../Homepage/homepage.html");
});

function renderFlatCards(filteredFlats = null) {
  const cardContainer = document.getElementById("cardContainer");
  if (!cardContainer) {
    console.error("No #cardContainer found in DOM.");
    return;
  }

  cardContainer.innerHTML = "";

  const flats =
    filteredFlats || JSON.parse(localStorage.getItem("flats")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  flats.forEach((flat) => {
    const card = document.createElement("div");
    card.classList.add("flat-card");
    const isFavorite = flat.favorites.some((el) => el === loggedUser.userId);
    if (isFavorite) {
      const favDiv = document.createElement("div");
      favDiv.innerText = "favorite";
      favDiv.classList.add("favDiv");
      card.appendChild(favDiv);
    }
    // Image Container
    if (flat.uploadImg) {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("flat-image-container");

      const img = document.createElement("img");
      img.src = flat.uploadImg;
      img.alt = flat.shortName || "Flat Image";
      img.classList.add("flat-image");

      // Add click event to open modal with the correct ID
      img.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent accidental propagation
        openFlatModal(flat.id); // 🔥 Pass the correct Flat ID instead of index
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
// Pagination Variables
function openFlatModal(flatId) {
  console.log(`🔹 Opening modal for flat ID: ${flatId}`);

  const flats = JSON.parse(localStorage.getItem("flats")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the correct flat by ID
  const selectedFlat = flats.find((flat) => flat.id === flatId);

  if (!selectedFlat) {
    console.error("❌ Flat not found.");
    return;
  }

  // Remove any existing modal before creating a new one
  const existingModal = document.getElementById("flatModal");
  if (existingModal) {
    console.log("🔹 Removing existing modal...");
    existingModal.remove();
  }

  // Find the owner of the flat
  const owner = users.find((user) => user.id === selectedFlat.userId);

  const isFavorite = selectedFlat.favorites.some(
    (el) => el === loggedUser.userId
  );

  // Create modal HTML
  const modalHTML = `
      <div id="flatModal" class="modal">
          <div class="modal-content">
              <span class="close-modal">Close</span>
              <div class="favorite-container">
              <span class="favorite-icon" id="favIcon" data-flat-id="${
                selectedFlat.id
              }">
                      ${
                        isFavorite
                          ? `<svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>`
                          : `<svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>`
                      }
                  </span>
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
    renderFlatCards();
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
  document.querySelectorAll(".favorite-icon").forEach((button) => {
    console.log(button);
    button.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevents event bubbling if inside another clickable element
      const flats = readFromLS("flats");
      toggleFavorite(flatId, button);
    });
  });
}

let currentPage = 0;
let CARDS_PER_PAGE = 8;

function updateCardsPerPage() {
  if (window.matchMedia("(max-width: 375px)").matches) {
    CARDS_PER_PAGE = 1;
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    CARDS_PER_PAGE = 2;
  } else {
    CARDS_PER_PAGE = 12;
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
document.getElementById("sortOptions").addEventListener("change", function () {
  const selectedCriteria = this.value;
  if (selectedCriteria) {
    sortFlats(selectedCriteria);
  }
});

function sortFlats(criteria) {
  let flats = JSON.parse(localStorage.getItem("flats")) || [];

  if (criteria === "city") {
    flats.sort((a, b) => a.city.localeCompare(b.city)); // Sort Alphabetically
  } else if (criteria === "rentPrice") {
    flats.sort((a, b) => a.rentPrice - b.rentPrice); // Sort Numerically
  } else if (criteria === "areaSize") {
    flats.sort((a, b) => a.areaSize - b.areaSize); // Sort Numerically
  }

  localStorage.setItem("flats", JSON.stringify(flats)); // Update localStorage
  renderFlatCards(); // Re-render flats
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

function getFlatsFromStorage() {
  return JSON.parse(localStorage.getItem("flats")) || [];
}

function filterFlats() {
  let flats = getFlatsFromStorage();

  const filterCriteria = document.getElementById("filterOptions").value;
  const filterValue = document
    .getElementById("filterInputField")
    .value.toLowerCase()
    .trim();

  if (!filterCriteria || !filterValue) {
    renderFlatCards(flats); // Show all if no criteria or input
    return;
  }

  const filteredFlats = flats.filter((flat) => {
    let flatValue = flat[filterCriteria];

    // Convert numbers to string for filtering comparison
    if (typeof flatValue === "number") {
      flatValue = flatValue.toString();
    }

    return flatValue.toLowerCase().includes(filterValue);
  });

  renderFlatCards(filteredFlats); // 🔥 Now updates the UI properly
}

// Event Listener for filtering on keypress
document
  .getElementById("filterInputField")
  .addEventListener("keyup", filterFlats);

// Detect screen size changes
window.addEventListener("resize", updateCardsPerPage);
window.addEventListener("DOMContentLoaded", () => {
  renderFlatCards();
  updateCardsPerPage();
});

export { renderFlatCards };
