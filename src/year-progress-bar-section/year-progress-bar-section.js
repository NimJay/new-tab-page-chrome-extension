/**
 * @file This contains the JavaScript that renders and sets the width of the "year-progress-bar-section".
 *
 * To add the progress bar in an HTML page:
 * 1. Create a <div> or <section> with id "year-progress-bar-section".
 * 2. Import the associated CSS file (using a <link> tag).
 * 3. Import and run renderYearProgressBar() in your main JavaScript module.
 */

function setHtml() {
    const parent = document.getElementById('year-progress-bar-section');
    parent.innerHTML = `
<div id="year-progress-bar-section-outer-bar">
    <div id="year-progress-bar-section-inner-bar"></div>
</div>
<div id="year-progress-bar-section-months">
    <span>Jan</span>
    <span>Feb</span>
    <span>Mar</span>
    <span>Apr</span>
    <span>May</span>
    <span>Jun</span>
    <span>Jul</span>
    <span>Aug</span>
    <span>Sep</span>
    <span>Oct</span>
    <span>Nov</span>
    <span>Dec</span>
</div>`;
}

/**
 * What percentage of this year has gone by?
 * @returns {number} A number like 0.54321.
 */
function getPercentageOfYearComplete() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 0);
    const millisecondsElapsed = now.getTime() - startOfYear.getTime();
    const totalMilliseconds = endOfYear.getTime() - startOfYear.getTime();
    return millisecondsElapsed / totalMilliseconds;
}

/**
 * What percentage of this year is in a specified month?
 * @param {number} month The index of the month (Jan is 1, Dec is 11).
 * @returns {number} A number like 0.12345.
 */
function getPercentageOfYearInMonth(month) {
    const thisYear = new Date().getFullYear();
    debugger;
    const startOfMonth = new Date(thisYear, month, 1);
    const endOfMonth = new Date(thisYear, month + 1, 1);
    const millisecondsInMonth = endOfMonth.getTime() - startOfMonth.getTime();
    const millisecondsInYear =
        (new Date(thisYear + 1, 0, 0)).getTime() -
        (new Date(thisYear, 0, 0)).getTime();
    return millisecondsInMonth / millisecondsInYear;
}

function computeAndSetWidthsOfInnerBar() {
    const progressBarDiv = document.getElementById('year-progress-bar-section-inner-bar');
    const width = getPercentageOfYearComplete() * 100;
    progressBarDiv.style.width = `${width}%`;
}

function roundDown2DecimalPoints(number) {
    return Math.floor(number * 100) / 100;
}

function computeAndSetWidthsOfMonths() {
    const monthSpans = document.querySelectorAll('#year-progress-bar-section-months span');
    monthSpans.forEach((monthSpan, index) => {
        let width = getPercentageOfYearInMonth(index) * 100;
        width = roundDown2DecimalPoints(width); // Round down to be safe (to prevent overflow)
        monthSpan.style.width = `${width}%`;
    });
}

function renderYearProgressBar() {
    setHtml();
    computeAndSetWidthsOfInnerBar();
    computeAndSetWidthsOfMonths();
}

export { renderYearProgressBar };
