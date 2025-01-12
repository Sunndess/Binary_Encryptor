chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || tab.url.startsWith('chrome://')) {
    console.warn("No se puede interactuar con páginas chrome://.");
    return;
  }

  // Obtener el texto seleccionado en la página web activa
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getSelectedText,
  }, (results) => {
    const selectedText = results[0]?.result || '';
    chrome.storage.local.set({ selectedText: selectedText });
  });
});

function getSelectedText() {
  return window.getSelection().toString();
}