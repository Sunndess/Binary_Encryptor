document.addEventListener('mouseup', function () {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.storage.local.set({ selectedText: selectedText }, function () {
            console.log('Texto seleccionado guardado:', selectedText);
        });
    }
});
