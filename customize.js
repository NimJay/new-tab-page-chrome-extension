let isSaving = false;

async function onSave() {
    if (isSaving) {
        return;
    }
    isSaving = true;
    setSaveStatus('Saving...');
    const textarea = document.getElementById('new-tab-config');
    try {
        await updateNewTabConfig(JSON.parse(textarea.value));
        await waitXMilliseconds(800); // For smoother UI.
        setSaveStatus(`Changes saved at ${getUserFriendlyTime()}.`);
    } catch {
        setSaveStatus('Failed to save your changes. Double check your punctuation.', true);
        console.error('Failed to save newTabConfig, likely because JSON.parse failed');
    } finally {
        isSaving = false;
    }
}

function getUserFriendlyTime() {
    const time = new Date();
    const config = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };
    return time.toLocaleString('en-US', config);
}

function clearSaveStatus() {
    const saveStatusEl = document.getElementById('save-status');
    saveStatusEl.classList.remove('save-status-error');
    saveStatusEl.innerHTML = '';
}

function setSaveStatus(statusMessage, isError) {
    const saveStatusEl = document.getElementById('save-status');
    if (isError) {
        saveStatusEl.classList.add('save-status-error');
    }
    saveStatusEl.innerHTML = statusMessage;
}

async function renderPage() {
    const newTabConfig = await loadNewTabConfig();
    const textarea = document.getElementById('new-tab-config');
    textarea.value = JSON.stringify(newTabConfig, null, '    ');
    document.getElementById('save').addEventListener('click', onSave);
}

function waitXMilliseconds(numOfMilliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, numOfMilliseconds)
    });
}

window.onload = function () {
    renderPage();
};
