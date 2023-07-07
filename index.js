// Implement save button function, have " onclick="saveLink()"" in html
// function saveLink() {
//   console.log("button clicked using onclick");
// }

let myLinks = [];
const inputEl = document.getElementById("input-el"); // const cannot be resigned
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");

// Array to string
// myLinks = JSON.stringify(myLinks)
// String to array
// myLinks = JSON.parse(myLinks)

// Local storage to store the links
// localStorage.setItem("myLinks", "www.youtube.com")
// Clear local storage
// localStorage.clear()

// On start display the stored links
const linksSaved = JSON.parse(localStorage.getItem("myLinks"));
if (linksSaved) {
  myLinks = linksSaved;
  render(myLinks);
}

// Push the value from the input field to myLinks
inputBtn.addEventListener("click", function () {
  if (!myLinks.includes(inputEl.value)) {
    myLinks.push(inputEl.value);
  }
  // Clear the input field after saving
  inputEl.value = "";
  localStorage.setItem("myLinks", JSON.stringify(myLinks));
  render(myLinks);
});

// Save current tab
tabBtn.addEventListener("click", function () {
  // Use Chrome API to get the current current link
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (!myLinks.includes(tabs[0].url)) {
      myLinks.push(tabs[0].url);
    }
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
  });
});

// Delete functionality
deleteBtn.addEventListener("dblclick", function () {
  myLinks = [];
  localStorage.clear();
  render(myLinks);
});

function render(list) {
  let listItems = "";
  for (let i = 0; i < list.length; i++) {
    // Use innerHTML to tell the compiler to read the strings as HTML
    // ulEl.innerHTML += "<li>" + myLinks[i] + "</li>";

    // Create element then append to unordered list
    // const li = document.createElement("li"); // No HTML tags here
    // li.textContent = myLinks[i];
    // ulEl.append(li);

    // Make the text a link and open in a new tab
    listItems += `
      <li>
        <a target="_blank" href="${list[i]}">
          ${list[i]}
        </a>
      </li>`;
  }
  // Then display it (faster), as innerHTML is costly
  ulEl.innerHTML = listItems;
}
