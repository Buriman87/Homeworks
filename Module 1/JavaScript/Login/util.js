const writeToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const readFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const removeFromLS = (key) => {
  if (readFromLS(key)) {
    localStorage.removeItem(key);
    return true;
  }
  return false;
};

function isValidUsername(username) {
  if (username.length >= 4) {
    return true; 
  } else {
    alert('Something went wrong')
  }
}
export { writeToLS, readFromLS, removeFromLS };
