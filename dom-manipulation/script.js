// Quotes array
const quotes = [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const displayDiv = document.getElementById("quoteDisplay");
  displayDiv.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
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

// Ensure everything waits for page load
window.onload = function() {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("createFormBtn").addEventListener("click", createAddQuoteForm);
};

