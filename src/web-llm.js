/**
 * @fileoverview
 * This file provides an interface to the rest of the Chrome extension for WebLLM.
 * MLC stands for machine learning compiler.
 */

const LLM_NAME = 'gemma-2b-it-q4f32_1-MLC'; // We should only be sticking to one LLM
let webLlmApi; // Do not access directly
let llmEngine; // Do not access directly

/**
 * LLMs are heavy.
 * Since we'll be defering the loading of the LLM to be used,
 * we might as well also defer importing of the web-llm.js library.
 */
async function getWebLlmApi() {
    if (webLlmApi) {
        return webLlmApi;
    }
    console.log('Importing web-llm.js...');
    webLlmApi = await import("./dependencies/web-llm.js");
    console.log('Imported web-llm.js.', { webLlmApi });
    return webLlmApi;
}

async function getLlmEngine(llmName) {
    const webLlmApi = await getWebLlmApi();
    const initProgressCallback = (initProgress) => {
        // The text contains a string similar to: "Loading LLM (undefined): Fetching param cache[22/108]: 1019MB fetched. 23% completed, 32 secs elapsed. It can take a while when we first visit this page to populate the cache. Later refreshes will become faster."
        console.log(`Loading LLM (${llmName}): ${initProgress.text}`);
    }
    llmEngine = await webLlmApi.CreateExtensionServiceWorkerMLCEngine(
        LLM_NAME,
        { initProgressCallback },
    );
    return llmEngine;
}

/**
 * Generate the response from some LLM (large language model).
 * @param {string} prompt
 * @returns {Promise<string>} The string will be the response from the LLM.
 */
async function generateUsingLlm(systemPrompt, userQuery) {
    const engine = await getLlmEngine();
    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuery },
    ]
    const reply = await engine.chat.completions.create({
        messages,
    });
    console.log(reply.choices[0].message);
    console.log(reply.usage);
}

/**
 * Delete this function once you have confidence that all this WebLlm stuff works.
 * This function is to be invoked from the new-tab.html page in a non-blocking manner.
 * Since all the heavy WebLlm computations are done in the service-worker,
 * the UI thread won't be blocked.
 */
async function testWebLlm() {
    console.log("Testing WebLlm...");
    await generateUsingLlm(
        "Give me a score from 1 to 3.",
        "How similar are these two phrases? Chatbot and box\n3: Very related.\n2: Slightly related.\n1: Not related at all.",
    );
}

export { testWebLlm, generateUsingLlm };
