function renderLinkList1(newTabConfig) {
    const linkList1Element = document.getElementById('link-list-1');
    let innerHTML = '';
    newTabConfig.linkList1.forEach((link) => {
        innerHTML += `<li><a href="${link.url}">${link.name}</a></li>`;
    });
    linkList1Element.innerHTML = innerHTML;
}

function renderLinkList2(newTabConfig) {
    const linkList2Element = document.getElementById('link-list-2');
    let innerHTML = '';
    newTabConfig.linkList2.forEach((link) => {
        innerHTML += `<li><a href="${link.url}">${link.name}</a></li>`;
    });
    linkList2Element.innerHTML = innerHTML;
}

function renderRandomQuote(newTabConfig) {
    const quotes = newTabConfig.randomQuotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("random-quote").innerHTML = quote;
}

async function renderPage() {
    const newTabConfig = await loadNewTabConfig();
    renderLinkList1(newTabConfig);
    renderLinkList2(newTabConfig);
    renderRandomQuote(newTabConfig);
}

window.onload = function () {
    renderPage();
};
