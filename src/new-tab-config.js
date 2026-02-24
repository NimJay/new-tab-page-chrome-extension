// This file maintains the state of the "new tab" page's configurations.

const DEFAULT_NEW_TAB_CONFIG = {
    linkList: [
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
    const config = result.newTabConfig;

    // Backwards compatibility: Merge old lists if new list doesn't exist
    // TODO: Remove this after June 2026.
    if (config && !config.linkList && config.linkList1 && config.linkList2) {
        config.linkList = [...config.linkList1, ...config.linkList2];
        delete config.linkList1;
        delete config.linkList2;
        // Persist the migration
        await updateNewTabConfig(config);
    }

    if (isValidNewTabConfig(config)) {
        return config;
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
        && newTabConfig.linkList
        && newTabConfig.randomQuotes;
}
