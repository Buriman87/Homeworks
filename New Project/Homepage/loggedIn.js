import { removeFromLS, readFromLS } from "../Utils/utils.js";
import { renderFlatCards } from "../Homepage/homepage.js";
console.log("Logged in user script loaded!");

const navbar = document.querySelector(".navbar");
const actionBtns = document.getElementById("actionBtn");

const newMenus = ["add Flat", "view My Flats", "profile"];
function toTitleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
newMenus.forEach((name) => {
  const newDiv = document.createElement("div");
  newDiv.textContent = toTitleCase(name);
  const camelCaseClass = name
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
  newDiv.classList.add(camelCaseClass);
  const id = `${camelCaseClass}Btn`;
  newDiv.id = id;

  if (newDiv.id === "profileBtn") {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    dropdown.id = "dropdownBtn";

    const dropdownItems = [
      "myProfile",
      "messages",
      "myFlats",
      "settings",
      "logOut",
    ];
    dropdownItems.forEach((item) => {
      const dropdownDiv = document.createElement("div");
      dropdownDiv.textContent = item;
      dropdownDiv.classList.add("dropdown-item");
      dropdownDiv.id = item;
      dropdown.appendChild(dropdownDiv);
    });

    newDiv.appendChild(dropdown);

    newDiv.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdown.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      if (!newDiv.contains(event.target)) {
        dropdown.classList.remove("active");
      }
    });
  }

  actionBtns.appendChild(newDiv);
});

const addFlat = document.getElementById("addFlatBtn");
addFlat.innerText = "Add New Flat";

const myFlats = document.getElementById("viewMyFlatsBtn");
myFlats.innerText = "My Flats";

// const profileX = document.getElementById("profileBtn");
// profileX.innerText = "My Profile";

const logOutBtn = document.getElementById("logOut");

logOutBtn.addEventListener("click", () => {
  console.log("da");
  removeFromLS("loggedUser");
  window.location.assign("../Homepage/homepage.html");
});

const myProfile = document.getElementById("myProfile");
myProfile.addEventListener("click", () => {
  window.location.assign("../MyProfile/myProfile.html");
});

const body = document.getElementById("container");
const addNewFlat = document.getElementById("addFlatBtn");

function generateUniqueId() {
  // Example: 'flat_kg8t2u5kq_382'
  // - Date.now().toString(36) gives a base-36 timestamp
  // - Math.random().toString(36).substring(2) gives a random base-36 string
  return (
    "flat_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).substring(2)
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

addNewFlat.addEventListener("click", () => {
  const modal = document.createElement("div");
  modal.id = "modalCard";
  modal.classList.add("modalNewFlat");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  modalContent.innerHTML = `
    <h2>Add New Flat</h2>
    <form id="flatForm">
      <label for="cityBtn">City:</label>
      <input type="text" name="city" id="cityBtn" required />
      
      <label for="shortNameBtn">Short description:</label>
      <input type="text" name="shortName" id="shortNameBtn" required />
      
      <label for="streetBtn">Street:</label>
      <input type="text" name="street" id="streetBtn" required />
      
      <label for="streetNumberBtn">Street Number:</label>
      <input type="text" name="streetNumber" id="streetNumberBtn" required />
      
      <label for="areaSizeBtn">Area Size (m²):</label>
      <input type="number" name="areaSize" id="areaSizeBtn" required />
      
      <label for="acBtn">Air Conditioning:</label>
      <select name="ac" id="acBtn" required>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      
      <label for="yearBuiltBtn">Year Built:</label>
      <input type="number" name="yearBuilt" id="yearBuiltBtn" required />
      
      <label for="rentPriceBtn">Rent Price (EUR):</label>
      <input type="number" name="rentPrice" id="rentPriceBtn" required />
      
      <label for="availableFromBtn">Available From:</label>
      <input type="date" name="availableFrom" id="availableFromBtn" required />
      
      <label for="descriptionBtn">Description:</label>
      <textarea name="description" id="descriptionBtn" rows="3" required></textarea>
      
      <label for="uploadImgBtn">Upload Image (JPG/PNG only):</label>
      <input type="file" name="uploadImg" id="uploadImgBtn" accept=".jpg,.png" required />
      
      <div class="button-group">
        <button type="submit" class="submit-btn">Submit</button>
        <button type="button" id="closeModal" class="cancel-btn">Cancel</button>
      </div>
    </form>
  `;

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  document.getElementById("closeModal").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  document.getElementById("flatForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser || !loggedUser.userId) {
      alert("No user is logged in. Please log in first!");
      return;
    }

    const flat = {
      id: generateUniqueId(),
      userID: loggedUser.userId,
      favorites: [],
      city: document.getElementById("cityBtn").value,
      shortName: document.getElementById("shortNameBtn").value,
      street: document.getElementById("streetBtn").value,
      streetNumber: document.getElementById("streetNumberBtn").value,
      areaSize: parseFloat(document.getElementById("areaSizeBtn").value),
      ac: document.getElementById("acBtn").value,
      yearBuilt: parseInt(document.getElementById("yearBuiltBtn").value),
      rentPrice: parseFloat(document.getElementById("rentPriceBtn").value),
      availableFrom: document.getElementById("availableFromBtn").value,
      description: document.getElementById("descriptionBtn").value,
    };

    const uploadImg = document.getElementById("uploadImgBtn").files[0];
    if (uploadImg) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(uploadImg.type)) {
        alert("Unsupported file type. Please upload a JPG or PNG image.");
        return;
      }
      flat.uploadImg = await convertToBase64(uploadImg);
    } else {
      flat.uploadImg = null;
    }

    const flats = JSON.parse(localStorage.getItem("flats")) || [];
    flats.push(flat);
    localStorage.setItem("flats", JSON.stringify(flats));

    alert("Flat details successfully submitted!");
    document.body.removeChild(modal);
    window.location.assign("../Homepage/homepage.html");
  });
});

function displayFlatsSection() {
  console.log("🔹 Running displayFlatsSection()...");

  const cardCarousel = document.querySelector(".card-carousel");

  if (!cardCarousel) {
    console.error("❌ card-carousel container not found.");
    return;
  }

  const oldFlatsContainer = document.querySelector(".card-viewport");
  if (oldFlatsContainer) {
    console.log("🔹 Removing old flats container...");
    oldFlatsContainer.remove();
  }

  const existingSection = document.getElementById("flatsSection");
  if (existingSection) {
    console.log("🔹 Removing old flats section...");
    existingSection.remove();
  }

  const flatsSection = document.createElement("div");
  flatsSection.id = "flatsSection";
  flatsSection.classList.add("flats-container");

  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  console.log("🔹 Creating toggle buttons...");

  const myFlatsBtn = document.createElement("button");
  myFlatsBtn.textContent = "My Flats";
  myFlatsBtn.classList.add("toggle-btn");
  myFlatsBtn.id = "myFlatsToggle";

  const favoriteFlatsBtn = document.createElement("button");
  favoriteFlatsBtn.textContent = "Favorite Flats";
  favoriteFlatsBtn.classList.add("toggle-btn");
  favoriteFlatsBtn.id = "favoriteFlatsToggle";

  toggleContainer.appendChild(myFlatsBtn);
  toggleContainer.appendChild(favoriteFlatsBtn);
  flatsSection.appendChild(toggleContainer);

  const cardContainer = document.createElement("div");
  cardContainer.id = "cardContainer";
  cardContainer.classList.add("card-container");
  flatsSection.appendChild(cardContainer);

  console.log("🔹 Appending flatsSection to card-carousel...");
  cardCarousel.appendChild(flatsSection);

  console.log("✅ Toggle buttons should now be displayed, but no flats yet.");

  myFlatsBtn.addEventListener("click", () => {
    console.log("🔹 My Flats button clicked");
    myFlatsBtn.classList.add("active");
    favoriteFlatsBtn.classList.remove("active");
    renderUserFlats();
  });

  favoriteFlatsBtn.addEventListener("click", () => {
    console.log("🔹 Favorite Flats button clicked");
    favoriteFlatsBtn.classList.add("active");
    myFlatsBtn.classList.remove("active");
    renderFavoriteFlats();
  });

  console.log(
    "✅ Toggle buttons should be working, but no flats displayed until user selects."
  );
}

function renderUserFlats() {
  console.log("🔹 Loading user flats...");
  const loggedUser = readFromLS("loggedUser");
  const flats = readFromLS("flats") || [];

  if (!loggedUser || !loggedUser.userId) {
    console.error("❌ No logged-in user found.");
    return;
  }

  const userFlats = flats.filter(
    (flat) => String(flat.userID) === String(loggedUser.userId)
  );

  console.log("✅ Flats added by user:", userFlats);

  renderFlatCards(userFlats);
}

function renderFavoriteFlats() {
  console.log("🔹 Loading favorite flats...");
  const loggedUser = readFromLS("loggedUser");
  const flats = readFromLS("flats") || [];

  if (!loggedUser || !loggedUser.userId) {
    console.error("❌ No logged-in user found.");
    return;
  }

  const favoriteFlats = flats.filter((flat) =>
    flat.favorites.includes(loggedUser.userId)
  );

  console.log("✅ Favorite flats:", favoriteFlats);

  renderFlatCards(favoriteFlats);
}

document
  .getElementById("viewMyFlatsBtn")
  .addEventListener("click", displayFlatsSection);
document
  .getElementById("myFlats")
  .addEventListener("click", displayFlatsSection);
