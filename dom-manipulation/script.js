document.addEventListener("DOMContentLoaded", () => {

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuoteBtn");

  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");

  // Quotes array
  let quotes = [
    { text: "Learning never exhausts the mind.", category: "Education" },
    { text: "Simplicity is the soul of efficiency.", category: "Technology" },
    { text: "Design is intelligence made visible.", category: "Design" }
  ];

  // Show random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  }

  // Add quote dynamically
  function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text === "" || category === "") {
      alert("Please enter both quote and category");
      return;
    }

    quotes.push({ text, category });

    newQuoteText.value = "";
    newQuoteCategory.value = "";

    showRandomQuote();
  }

  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);

});
