function getDecodedQueryParamValue(name) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(name);
    if (!value) {
        return null; // decodeURIComponent() would convert null into "null" (a string)
    }
    return decodeURIComponent(value);
}

function main() {
    const href = getDecodedQueryParamValue('href');
    const name = getDecodedQueryParamValue('name');
    if (!href) {
        alert("Missing href.");
        throw new Error("Missing href.");
    }
    recordVisitInLocalStorage(href, name);
    window.location.href = href;
}

// We avoid using "window.onload = function () {" to reduce delays.
main();
