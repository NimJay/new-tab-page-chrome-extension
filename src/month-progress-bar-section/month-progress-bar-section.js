/**
 * @file This contains the JavaScript that renders and sets the width(s) of the "month-progress-bar-section".
 *
 * To add the progress bar in an HTML page:
 * 1. Create a <div> or <section> with id "month-progress-bar-section".
 * 2. Import the associated CSS file (using a <link> tag).
 * 3. Import and run renderMonthProgressBar() in your main JavaScript module.
 */

function setHtml() {
    const parent = document.getElementById('month-progress-bar-section');
    const monthAndDate = getCurrentMonthAndDateString();
    parent.innerHTML = `
<div id="month-progress-bar-section-outer-bar">
    <div id="month-progress-bar-section-inner-bar"></div>
    <div id="month-progress-bar-section-date">${monthAndDate}</div>
</div>`;
}

/**
 * What percentage of this month has already gone by?
 * @returns {number} Something like 0.321.
 */
function getPercentageOfMonthComplete() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const millisecondsElapsed = now.getTime() - startOfMonth.getTime();
    const totalMilliseconds = endOfMonth.getTime() - startOfMonth.getTime();
    return millisecondsElapsed / totalMilliseconds;
}

function computeAndSetWidths() {
    const width = getPercentageOfMonthComplete() * 100;
    const progressBarDiv = document.getElementById('month-progress-bar-section-inner-bar');
    progressBarDiv.style.width = `${width}%`;
    const dateDiv = document.getElementById('month-progress-bar-section-date');
    dateDiv.style.width = `${width}%`;
}

/**
 * @returns {string} Something like "Jan 7".
 */
function getCurrentMonthAndDateString() {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'short' });
    const date = today.getDate();
    return `${month} ${date}`;
}

function renderMonthProgressBar() {
    setHtml();
    computeAndSetWidths();
}

export { renderMonthProgressBar };
