let isSaving = false;

async function onSave() {
    if (isSaving) {
        return;
    }
    isSaving = true;
    const textarea = document.getElementById('new-tab-config');
    try {
        await updateNewTabConfig(JSON.parse(textarea.value))
    } catch {
        console.error('Failed to save newTabConfig, likely because JSON.parse failed');
    } finally {
        isSaving = false;
    }
}

async function renderPage() {
    const newTabConfig = await loadNewTabConfig();
    const textarea = document.getElementById('new-tab-config');
    textarea.value = JSON.stringify(newTabConfig, null, '    ');
    document.getElementById('save').addEventListener('click', onSave);
}

window.onload = function () {
    renderPage();
};
