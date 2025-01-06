// This file maintains the state of the "new tab" page's configurations.

const DEFAULT_NEW_TAB_CONFIG = {
    linkList1: [
        {
            "name": "Default",
            "url": "https://example.com",
        }
    ],
    linkList2: [
        {
            "name": "Default",
            "url": "https://example.com",
        }
    ],
    randomQuotes: [
        "Default..."
    ]
};

async function loadNewTabConfig() {
    const result = await chrome.storage.sync.get(["newTabConfig"]);
    if (isValidNewTabConfig(result.newTabConfig)) {
        return result.newTabConfig;
    } else {
        console.warn('Returning DEFAULT_NEW_TAB_CONFIG');
        return DEFAULT_NEW_TAB_CONFIG;
    }
}

async function updateNewTabConfig(newTabConfig) {
    if (isValidNewTabConfig(newTabConfig)) {
        await chrome.storage.sync.set({ newTabConfig });
    } else {
        console.error(`The newTabConfig wasn't updated because it was invalid.`);
    }
}

function isValidNewTabConfig(newTabConfig) {
    // TODO: Improve validation.
    return typeof newTabConfig === 'object'
        && newTabConfig
        && newTabConfig.linkList1
        && newTabConfig.linkList2
        && newTabConfig.randomQuotes;
}
