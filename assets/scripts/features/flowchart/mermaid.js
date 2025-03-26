import mermaid from 'mermaid'
import * as params from '@params'

const elementCode = '.mermaid'

initMermaid();

// Save original mermaid code to data attribute
function saveOriginalData() {
    return new Promise((resolve, reject) => {
        try {
            const elements = document.querySelectorAll(elementCode);
            let count = elements.length;
            
            if (count === 0) {
                resolve();
                return;
            }
            
            elements.forEach(element => {
                element.setAttribute('data-original-code', element.innerHTML);
                count--;
                if (count === 0) {
                    resolve();
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

// Reset processed diagrams to original state
function resetProcessed() {
    return new Promise((resolve, reject) => {
        try {
            const elements = document.querySelectorAll(elementCode);
            let count = elements.length;
            
            if (count === 0) {
                resolve();
                return;
            }
            
            elements.forEach(element => {
                if (element.getAttribute('data-original-code') != null) {
                    element.removeAttribute('data-processed');
                    element.innerHTML = element.getAttribute('data-original-code');
                }
                count--;
                if (count === 0) {
                    resolve();
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

function setMermaidTheme(siteTheme) {
    let themeName = 'default';

    if (siteTheme === 'dark') themeName = 'dark';

    // Set custom theme
    if (themeName === 'default' && params.flowchart?.mermaid.theme) {
        themeName = params.flowchart?.mermaid.theme;
    }
    else if (themeName === 'dark' && params.flowchart?.mermaid.darktheme) {
        themeName = params.flowchart?.mermaid.darktheme;
    }
    const mermaidOptions = { theme: themeName };
    const options = Object.assign({}, mermaidOptions, { startOnLoad: true });

    // Initialize mermaid with the new options
    mermaid.initialize(options);
    
    // Reload diagrams if they exist on the page
    resetProcessed()
        .then(() => {
            mermaid.init(options, document.querySelectorAll(elementCode));
        })
        .catch(console.error);
}

function initMermaid() {
    saveOriginalData().catch(console.error);
    setMermaidTheme("light");
}

export { setMermaidTheme }