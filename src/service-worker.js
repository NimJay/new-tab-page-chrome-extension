/**
 * @fileoverview
 * This is the service worker for this Chrome extension that runs in its own thread.
 *
 * During development, you will need to refresh your Chrome extension (in developer mode) to
 * have the browser pick up on updates to this file.
 */

import { ExtensionServiceWorkerMLCEngineHandler } from "./dependencies/web-llm.js";

console.log(`service-worker.js: The browser has discovered this service worker.`);

// Register WebLlm handler.
// The WebLlm library has a "Handler" that you can register inside this service worker.
// Using this handler inside this serviceworker ensures that WebLlm's heavy computations won't block the main (UI) thread.
// The handler (and the use of CreateExtensionServiceWorkerMLCEngine on the UI/main thread side)
// allows us to abstract away the main-thread-to-service-worker communication.
let webLlmHandler;
chrome.runtime.onConnect.addListener(function (port) {
    console.log('service-worker.js: onConnect.');
    if (port.name === "web_llm_service_worker") {
        if (webLlmHandler === undefined) {
            webLlmHandler = new ExtensionServiceWorkerMLCEngineHandler(port);
        } else {
            webLlmHandler.setPort(port);
        }
        port.onMessage.addListener(webLlmHandler.onmessage.bind(webLlmHandler));
    }
});

self.addEventListener('install', event => {
    console.log('service-worker.js: Installed.');
});

self.addEventListener('activate', event => {
    console.log('service-worker.js: Activated.');
});
