
const QUOTES = [
    "Detach. Reanchor. Plan. Enjoy.",
    "Reduce the friction between you and your goals.",
    "Remember the less fortunate and the illusion of proximity. Don't compete.",
    "Only check emails thrice a day.",
    "<em>Feeling</em> productive is different from <em>being</em> productive.",
    "Try to enjoy every social moment — you need socialization.",
    "Moderate info consumption.",
    "Clarify your objectives.",
];
const randomIndex = Math.floor(Math.random() * QUOTES.length);
const quote = QUOTES[randomIndex];
document
    .getElementById("random-quote")
    .innerHTML = quote;