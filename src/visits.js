/**
 * @file Contains the logic related to link visits including recording visits in localStorage.
 */

/**
 * @typedef {object} Visit
 * @property {string} name - The body of the <a> tag.
 * @property {string} href - The href of the <a> tag.
 * @property {number} timeVisited - The Unix timestamp.
 */

/**
 * @type {Array<Visit>|undefined}
 */
let visitsOrUndefined; // Use loadVisits() or other methods to access visits.

/**
 * @returns {Array<Visit>}
 */
function loadVisits() {
    if (typeof visitsOrUndefined === 'undefined') {
        const visitsString = localStorage.getItem('visits');
        if (visitsString) {
            visitsOrUndefined = JSON.parse(visitsString);
        } else {
            visitsOrUndefined = [];
        }
    }
    return visitsOrUndefined;
}

function recordVisitInLocalStorage(href, name) {
    const timeVisited = Date.now();
    let visits = localStorage.getItem('visits');
    if (!visits) {
        visits = [];
    } else {
        visits = JSON.parse(visits);
    }
    visits.push({ name, href, timeVisited });
    localStorage.setItem('visits', JSON.stringify(visits));
}

function getTotalNumOfVisits() {
    const visits = loadVisits();
    return visits.length;
}

function getNumOfVisitsOfHrefInLastXDays(href, numOfDays) {
    let visits = loadVisits();
    const timestampXDayAgo = Date.now() - (numOfDays * 24 * 60 * 60 * 1000);
    visits = visits.filter((visit) => {
        return visit.href === href && visit.timeVisited > timestampXDayAgo;
    });
    return visits.length;
}
