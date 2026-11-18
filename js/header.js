class MainHeader extends HTMLElement {
    async connectedCallback() {
        try {
            const response = await fetch("components/header.html");
            if (!response.ok) {
                throw new Error(`ヘッダーを読み込めませんでした（${response.status}）`);
            }
            this.innerHTML = await response.text();
            this.initializeSettingsPanel();
        } catch (error) {
            console.error("ヘッダーの読み込みに失敗しました:", error);
            this.textContent = "ヘッダーを読み込めませんでした。ページを再読み込みしてください。";
        }
    }

    initializeSettingsPanel() {
        const settingsButton = this.querySelector("#btn-settings");
        const panel = this.querySelector("#side-panel");
        const panelContent = this.querySelector("#panel-content");
        const closeButton = this.querySelector("#btn-close");
        const backdrop = this.querySelector("#panel-backdrop");

        const closePanel = () => {
            if (!panel.classList.contains("open")) {
                return;
            }
            panel.classList.remove("open");
            backdrop.classList.remove("open");
            panel.setAttribute("aria-hidden", "true");
            panel.inert = true;
            settingsButton.focus();
        };

        settingsButton.addEventListener("click", async () => {
            try {
                const response = await fetch("settings.html");
                if (!response.ok) {
                    throw new Error(`設定ページを読み込めませんでした（${response.status}）`);
                }
                const settingsDocument = new DOMParser().parseFromString(
                    await response.text(),
                    "text/html"
                );
                const settingsContent = settingsDocument.querySelector("#settings-content");
                if (!settingsContent) {
                    throw new Error("設定ページに表示するコンテンツがありません。");
                }
                panelContent.replaceChildren(
                    ...Array.from(settingsContent.children, (child) => document.importNode(child, true))
                );
                const title = panelContent.querySelector("h2");
                if (title) {
                    title.id = "panel-title";
                }

                panel.inert = false;
                panel.setAttribute("aria-hidden", "false");
                requestAnimationFrame(() => {
                    panel.classList.add("open");
                    backdrop.classList.add("open");
                    closeButton.focus();
                });
            } catch (error) {
                console.error("設定画面を開けませんでした:", error);
                panelContent.textContent = "設定画面を読み込めませんでした。";
                panel.inert = false;
                panel.setAttribute("aria-hidden", "false");
                requestAnimationFrame(() => {
                    panel.classList.add("open");
                    backdrop.classList.add("open");
                    closeButton.focus();
                });
            }
        });

        closeButton.addEventListener("click", closePanel);
        backdrop.addEventListener("click", closePanel);
        this.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closePanel();
            }
        });
    }
}

customElements.define("main-header", MainHeader);
