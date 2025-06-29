// Initialize Quotes array
let quotes = [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Load from local storage if available
const storedQuotes = localStorage.getItem("quotes");
if (storedQuotes) {
  quotes = JSON.parse(storedQuotes);
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const displayDiv = document.getElementById("quoteDisplay");
  displayDiv.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;

  // Save the last viewed quote in session storage
sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Function to create the add quote form
function createAddQuoteForm() {
  const form = document.createElement("form");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter quote text";
  textInput.required = true;

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter category";
  categoryInput.required = true;

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Add Quote";

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(submitButton);

  const formContainer = document.getElementById("formContainer");
  // Clear any existing form
  formContainer.innerHTML = "";
  formContainer.appendChild(form);

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const newQuote = {
      text: textInput.value,
      category: categoryInput.value
    };
    quotes.push(newQuote);
    textInput.value = "";
    categoryInput.value = "";
    alert("Quote added!");
  });
}

// Function to export quotes as JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// On page load
window.onload = function() {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("createFormBtn").addEventListener("click", createAddQuoteForm);
   document.getElementById("exportBtn").addEventListener("click", exportQuotes);
  document.getElementById("importFile").addEventListener("change", importFromJsonFile);

    // Load last viewed quote from session storage
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const parsedQuote = JSON.parse(lastQuote);
    const displayDiv = document.getElementById("quoteDisplay");
    displayDiv.textContent = `"${parsedQuote.text}" — ${parsedQuote.category}`;
  }
};

