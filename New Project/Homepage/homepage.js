// import { readFromLS, replaceScript } from "../Utils/utils.js";

// const loggedUser = readFromLS("loggedUser") || {};
// if (Object.keys(loggedUser).length > 0) {
//   replaceScript("./loggedIn.js", true);
// } else {
//   replaceScript("./notLoggedIn.js", true);
// }
// function renderFlatCards() {
//   const cardContainer = document.getElementById("cardContainer");
//   if (!cardContainer) {
//     console.error("No #cardContainer found in DOM.");
//     return;
//   }

//   cardContainer.innerHTML = "";
//   const flats = JSON.parse(localStorage.getItem("flats")) || [];
//   const users = JSON.parse(localStorage.getItem("users")) || [];

//   flats.forEach((flat, index) => {
//     const card = document.createElement("div");
//     card.classList.add("flat-card");

//     const shortDescription = document.createElement("p");
//     shortDescription.innerHTML = `Description: <span id="short-description-${index}" class="editable-field">${flat.shortName}</span>`;
//     card.appendChild(shortDescription);

//     if (flat.uploadImg) {
//       const img = document.createElement("img");
//       img.src = flat.uploadImg;
//       img.alt = flat.shortName || "Flat Image";
//       img.classList.add("flat-image");
//       card.appendChild(img);
//     }

//     const city = document.createElement("p");
//     city.innerHTML = `City: <span id="city-${index}" class="editable-field">${flat.city}</span>`;
//     card.appendChild(city);

//     const street = document.createElement("p");
//     street.innerHTML = `Street: <span id="street-${index}" class="editable-field">${flat.street}</span>`;
//     card.appendChild(street);

//     const availData = document.createElement("p");
//     availData.innerHTML = `Available from: <span id="available-from-${index}" class="editable-field">${flat.availableFrom}</span>`;
//     card.appendChild(availData);

//     const price = document.createElement("p");
//     price.innerHTML = `Price: <span id="price-${index}" class="editable-field">${flat.rentPrice} €</span>`;
//     card.appendChild(price);

//     // Find the owner (user) of the flat
//     const owner = users.find((user) => user.id === flat.userId);

//     const contactPhone = document.createElement("p");
//     contactPhone.innerHTML = `Phone: <span id="phone-${index}" class="editable-field">${
//       owner ? owner.phoneNumber : "Not available"
//     }</span>`;
//     card.appendChild(contactPhone);

//     cardContainer.appendChild(card);
//   });

//   setupCardPagination(flats.length);
// }

// let currentPage = 0;
// const CARDS_PER_PAGE = 8;

// function updateVisibleCards(totalFlats) {
//   const cardContainer = document.getElementById("cardContainer");
//   const cards = cardContainer.querySelectorAll(".flat-card");

//   cards.forEach((card) => {
//     card.style.display = "none";
//   });

//   const startIndex = currentPage * CARDS_PER_PAGE;
//   const endIndex = startIndex + CARDS_PER_PAGE;

//   for (let i = startIndex; i < endIndex && i < totalFlats; i++) {
//     cards[i].style.display = "flex";
//   }

//   const prevBtn = document.getElementById("prevBtn");
//   const nextBtn = document.getElementById("nextBtn");

//   prevBtn.disabled = currentPage === 0;

//   nextBtn.disabled = endIndex >= totalFlats;
// }

// function setupCardPagination(totalFlats) {
//   const prevBtn = document.getElementById("prevBtn");
//   const nextBtn = document.getElementById("nextBtn");

//   if (!prevBtn || !nextBtn) {
//     console.error("Missing navigation arrow buttons in DOM.");
//     return;
//   }

//   currentPage = 0;

//   updateVisibleCards(totalFlats);

//   prevBtn.onclick = () => {
//     if (currentPage > 0) {
//       currentPage--;
//       updateVisibleCards(totalFlats);
//     }
//   };

//   nextBtn.onclick = () => {
//     if ((currentPage + 1) * CARDS_PER_PAGE < totalFlats) {
//       currentPage++;
//       updateVisibleCards(totalFlats);
//     }
//   };
// }

// window.addEventListener("DOMContentLoaded", () => {
//   renderFlatCards();
// });

// //sa pun div care sa tina toate P
// //inca un div care tine IMG

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

      imgContainer.appendChild(img);
      card.appendChild(imgContainer);
    }

    // Details Container
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("flat-details");

    const shortDescription = document.createElement("p");
    shortDescription.innerHTML = `Description: <span id="short-description-${index}" class="editable-field">${flat.shortName}</span>`;
    detailsContainer.appendChild(shortDescription);

    const city = document.createElement("p");
    city.innerHTML = `City: <span id="city-${index}" class="editable-field">${flat.city}</span>`;
    detailsContainer.appendChild(city);

    const street = document.createElement("p");
    street.innerHTML = `Street: <span id="street-${index}" class="editable-field">${flat.street}</span>`;
    detailsContainer.appendChild(street);

    const availData = document.createElement("p");
    availData.innerHTML = `Available from: <span id="available-from-${index}" class="editable-field">${flat.availableFrom}</span>`;
    detailsContainer.appendChild(availData);

    // Price with Tooltip for Non-Logged Users
    const price = document.createElement("p");
    if (Object.keys(loggedUser).length > 0) {
      price.innerHTML = `Price: <span id="price-${index}" class="editable-field">${flat.rentPrice} €</span>`;
    } else {
      price.innerHTML = `Price: <span id="price-${index}" class="editable-field tooltip" data-tooltip="Log in to see the price">•••• €</span>`;
    }
    detailsContainer.appendChild(price);

    // Find the owner (user) of the flat
    const owner = users.find((user) => user.id === flat.userId);

    const contactPhone = document.createElement("p");
    if (Object.keys(loggedUser).length > 0) {
      contactPhone.innerHTML = `Phone: <span id="phone-${index}" class="editable-field">${
        owner ? owner.phoneNumber : "Not available"
      }</span>`;
    } else {
      contactPhone.innerHTML = `Phone: <span id="phone-${index}" class="editable-field tooltip" data-tooltip="Log in to see the phone number">••••••••</span>`;
    }
    detailsContainer.appendChild(contactPhone);

    card.appendChild(detailsContainer);
    cardContainer.appendChild(card);
  });

  setupCardPagination(flats.length);
}

// Pagination Variables
let currentPage = 0;
let CARDS_PER_PAGE = 8;

// Function to detect screen size and update CARDS_PER_PAGE
function updateCardsPerPage() {
  if (window.matchMedia("(max-width: 768px)").matches) {
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
