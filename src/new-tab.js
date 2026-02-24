import { renderMonthProgressBar } from './month-progress-bar-section/month-progress-bar-section.js';
import { renderYearProgressBar } from './year-progress-bar-section/year-progress-bar-section.js';

function renderLinkList(newTabConfig) {
    const linkListElement = document.getElementById('link-list');
    let innerHTML = '';
    newTabConfig.linkList.forEach((link) => {
        const href = buildHrefValue(link.url, link.name);
        const liClass = `link-list-li`
            + `${isHighUsageHref(link.url) ? ' link-list-li-high-usage' : ''}`
            + `${isLowUsageHref(link.url) ? ' link-list-li-low-usage' : ''}`;
        innerHTML += `<li class="${liClass}"><a href="${href}">${link.name}</a></li>`;
    });
    linkListElement.innerHTML = innerHTML;
}

function renderRandomQuote(newTabConfig) {
    const quotes = newTabConfig.randomQuotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("random-quote").innerHTML = quote;
}

function renderNumOfLinksVisited() {
    document.getElementById("num-of-links-visited").innerHTML = getTotalNumOfVisits();
}

async function renderPage() {
    const newTabConfig = await loadNewTabConfig();
    renderLinkList(newTabConfig);
    renderRandomQuote(newTabConfig);
    renderNumOfLinksVisited();
    renderMonthProgressBar();
    renderYearProgressBar();
}

/**
 * Anchor tags (<a>) should have hrefs that go to go-to-href.html.
 * go-to-href.html takes care of recording link visits (for analytics).
 * @param {string} href
 * @param {string} name
 */
function buildHrefValue(href, name) {
    href = encodeURIComponent(href);
    name = encodeURIComponent(name);
    return `/go-to-href.html?href=${href}&name=${name}`;
}

function isHighUsageHref(href) {
    const numOfVisits = getNumOfVisitsOfHrefInLastXDays(href, 10);
    return numOfVisits >= 10;
}

function isLowUsageHref(href) {
    const numOfVisits = getNumOfVisitsOfHrefInLastXDays(href, 30);
    return numOfVisits <= 1;
}

window.onload = function () {
    renderPage();
};
