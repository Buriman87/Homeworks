import { removeFromLS, readFromLS } from "../Utils/utils.js";
console.log("Logged in user script loaded!");

const navbar = document.querySelector(".navbar");

const newMenus = ["add Flat", "view All Flats", "view My Flats", "profile"];

// myProfile.addEventListener("click", () => {
//   window.location.assign("../MyProfile/myProfile.html");
// });

newMenus.forEach((name) => {
  const newDiv = document.createElement("div");
  newDiv.textContent = name;
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
  if (name === "profile") {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const dropdownItems = [
      "myProfile",
      "messages",
      "myFlats",
      "allFlats",
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

    newDiv.addEventListener("mouseenter", () => {
      dropdown.style.maxHeight = "400px";
      dropdown.style.opacity = "1";
    });
    newDiv.addEventListener("mouseleave", () => {
      dropdown.style.maxHeight = "0";
      dropdown.style.opacity = "0";
    });
  }

  navbar.appendChild(newDiv);
});

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

// Helper function to generate a unique ID
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

// Helper function to convert file to Base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// addNewFlat.addEventListener("click", () => {
//   // Create a modal container
//   const modal = document.createElement("div");
//   modal.id = modalCard;
//   modal.style.position = "fixed";
//   modal.style.top = "0";
//   modal.style.left = "0";
//   modal.style.width = "100%";
//   modal.style.height = "100%";
//   modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
//   modal.style.display = "flex";
//   modal.style.justifyContent = "center";
//   modal.style.alignItems = "center";
//   modal.style.zIndex = "1000";

//   // Create modal content
//   const modalContent = document.createElement("div");
//   modalContent.style.backgroundColor = "#fff";
//   modalContent.style.padding = "20px";
//   modalContent.style.borderRadius = "8px";
//   modalContent.style.width = "400px";
//   modalContent.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
//   modalContent.innerHTML = `
//     <h2 style="text-align: center;">Add New Flat</h2>
//     <form id="flatForm">
//       <label for="cityBtn">City:</label>
//       <input type="text" name="city" id="cityBtn" required /><br />

//       <label for="shortNameBtn">Short description:</label>
//       <input type="text" name="shortName" id="shortNameBtn" required /><br />

//       <label for="streetBtn">Street:</label>
//       <input type="text" name="street" id="streetBtn" required /><br />

//       <label for="streetNumberBtn">Street Number:</label>
//       <input type="text" name="streetNumber" id="streetNumberBtn" required /><br />

//       <label for="areaSizeBtn">Area Size (m2):</label>
//       <input type="number" name="areaSize" id="areaSizeBtn" required /><br />

//       <label for="acBtn">AirConditioning (Yes/No):</label>
//       <select name="ac" id="acBtn" required>
//         <option value="yes">Yes</option>
//         <option value="no">No</option>
//       </select><br />

//       <label for="yearBuiltBtn">Year of constructiont:</label>
//       <input type="number" name="yearBuilt" id="yearBuiltBtn" required /><br />

//       <label for="rentPriceBtn">Rent Price (EUR):</label>
//       <input type="number" name="rentPrice" id="rentPriceBtn" required /><br />

//       <label for="availableFromBtn">Available From:</label>
//       <input type="date" name="availableFrom" id="availableFromBtn" required /><br />

//       <label for="descriptionBtn">Description:</label>
//       <textarea name="description" id="descriptionBtn" rows="3" required></textarea><br />

//       <label for="uploadImgBtn">Upload Image (JPG/PNG only):</label>
//       <input type="file" name="uploadImg" id="uploadImgBtn" accept=".jpg,.png" required /><br /><br />

//       <button type="submit" style="background-color: #4CAF50; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">Submit</button>
//       <button type="button" id="closeModal" style="background-color: #f44336; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-left: 10px;">Cancel</button>
//     </form>
//   `;

//   // Append modal content to modal
//   modal.appendChild(modalContent);

//   // Append modal to body
//   body.appendChild(modal);

//   // Handle form submission
//   const flatForm = document.getElementById("flatForm");
//   flatForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     // Retrieve the logged user from localStorage
//     const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
//     if (!loggedUser || !loggedUser.userId) {
//       alert("No user is logged in. Please log in first!");
//       return;
//     }

//     // Create the flat object
//     const flat = {
//       // Generate a unique ID for the flat
//       id: generateUniqueId(),
//       // The user who created this flat
//       userID: loggedUser.userId,
//       // An empty array to hold userIDs who favorite this flat in the future
//       favorites: [],

//       city: document.getElementById("cityBtn").value,
//       shortName: document.getElementById("shortNameBtn").value,
//       street: document.getElementById("streetBtn").value,
//       streetNumber: document.getElementById("streetNumberBtn").value,
//       areaSize: parseFloat(document.getElementById("areaSizeBtn").value),
//       ac: document.getElementById("acBtn").value,
//       yearBuilt: parseInt(document.getElementById("yearBuiltBtn").value),
//       rentPrice: parseFloat(document.getElementById("rentPriceBtn").value),
//       availableFrom: document.getElementById("availableFromBtn").value,
//       description: document.getElementById("descriptionBtn").value,
//     };

//     // Get the uploaded image file
//     const uploadImg = document.getElementById("uploadImgBtn").files[0];
//     if (uploadImg) {
//       // Validate file type (only JPG and PNG)
//       const validTypes = ["image/jpeg", "image/png"];
//       if (!validTypes.includes(uploadImg.type)) {
//         alert("Unsupported file type. Please upload a JPG or PNG image.");
//         return;
//       }
//       // Convert file to Base64
//       flat.uploadImg = await convertToBase64(uploadImg);
//     } else {
//       flat.uploadImg = null;
//     }

//     // Get existing flats from localStorage or initialize as empty array
//     const flats = JSON.parse(localStorage.getItem("flats")) || [];
//     // Push the new flat
//     flats.push(flat);

//     // Save updated flats back to localStorage
//     localStorage.setItem("flats", JSON.stringify(flats));

//     // Confirmation message
//     alert("Flat details successfully submitted!");

//     // Remove modal from DOM
//     body.removeChild(modal);
//   });

//   // Handle modal close
//   const closeModal = document.getElementById("closeModal");
//   closeModal.addEventListener("click", () => {
//     body.removeChild(modal);
//   });
// });

addNewFlat.addEventListener("click", () => {
  // Create a modal container
  const modal = document.createElement("div");
  modal.id = "modalCard";
  modal.classList.add("modal");

  // Create modal content
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

  // Append modal content to modal
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);

  // Handle modal close
  document.getElementById("closeModal").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Handle form submission
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
