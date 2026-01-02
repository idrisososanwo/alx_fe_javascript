let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal.", category: "Success" }
];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

/* ✅ REQUIRED FUNCTION */
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = ["all"];

  quotes.forEach(quote => {
    if (!categories.includes(quote.category)) {
      categories.push(quote.category);
    }
  });

  categoryFilter.innerHTML = "";

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category === "all" ? "All Categories" : category;
    categoryFilter.appendChild(option);
  });

  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
  }
}

/* ✅ REQUIRED FUNCTION */
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }

  filteredQuotes.forEach(quote => {
    const p = document.createElement("p");
    p.innerHTML = `${quote.text} <br><small>${quote.category}</small>`;
    quoteDisplay.appendChild(p);
  });
}

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));

  quoteDisplay.innerHTML = `
    <p>${quote.text}</p>
    <small>${quote.category}</small>
  `;
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (!text || !category) return;

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

/* ✅ REQUIRED */
function exportToJsonFile() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

/* ✅ REQUIRED */
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}

document
  .getElementById("newQuote")
  .addEventListener("click", showRandomQuote);

/* ✅ INITIALIZE */
populateCategories();
filterQuotes();
