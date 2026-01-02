// Array of quote objects
const quotes = [
    { text: "Learning never exhausts the mind.", category: "Education" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
    { text: "Success is not final, failure is not fatal.", category: "Motivation" }
];

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById("quoteDisplay");

    quoteDisplay.innerHTML = `
        <p>"${quotes[randomIndex].text}"</p>
        <small>Category: ${quotes[randomIndex].category}</small>
    `;
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    quotes.push({
        text: quoteText,
        category: quoteCategory
    });

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
}

// Event listener for button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
