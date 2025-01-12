// Función para convertir texto a binario
function textToBinary(text) {
    return Array.from(text)
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
}

// Función para convertir binario a texto
function binaryToText(binary) {
    return binary
        .split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
}

// Función para verificar si el texto es binario
function isBinary(str) {
    return /^[01\s]+$/.test(str);
}

// Manejo del resultado en el popup
function handleResult(result) {
    document.getElementById('output-text').value = result;
}

// Limpiar campos
function clearFields() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
}

// Copiar al portapapeles
function copyToClipboard() {
    const outputText = document.getElementById('output-text');
    if (outputText.value.trim()) {
        outputText.select();
        document.execCommand('copy');
        alert('Texto copiado al portapapeles.');
    } else {
        alert('No hay texto para copiar.');
    }
}

// Cargar texto seleccionado al abrir el popup
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('selectedText', function (data) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        const selectedText = data.selectedText || '';
        document.getElementById('input-text').value = selectedText;
    });

    // Botones y sus acciones
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');

    // Encriptar texto
    encryptBtn.addEventListener('click', function () {
        const text = document.getElementById('input-text').value.trim();
        if (text) {
            const binary = textToBinary(text);
            handleResult(binary);
        } else {
            handleResult('Por favor, ingresa texto para encriptar.');
        }
    });

    // Desencriptar texto
    decryptBtn.addEventListener('click', function () {
        const binary = document.getElementById('input-text').value.trim();
        if (isBinary(binary)) {
            const text = binaryToText(binary);
            handleResult(text);
        } else {
            handleResult('Por favor, ingresa texto binario válido.');
        }
    });

    // Limpiar campos
    clearBtn.addEventListener('click', clearFields);

    // Copiar texto al portapapeles
    copyBtn.addEventListener('click', copyToClipboard);
});