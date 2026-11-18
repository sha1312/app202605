import "./components/header.js";
import "./components/footer.js";

import { loadPage } from "./router.js";

import { renderAccount } from "./accmgr.js";
import { renderSettings } from "./settings.js";

function openPanel(htmlContent) {
    panelContent.innerHTML = htmlContent;
    sidePanel.classList.add('open');
}

function closePanel() {
    sidePanel.classList.remove('open');
}


document.getElementById("btn-settings").addEventListener("click", () => {
    openPanel(renderSettings());
});

document.getElementById("btn-profile").addEventListener("click", () => {
    openPanel(renderAccount());
});

document.getElementById('btn-close').addEventListener('click', closePanel);

loadPage("home");
