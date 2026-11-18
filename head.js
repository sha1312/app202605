class MainHead extends HTMLElement {

    async connectedCallback() {

        const response = await fetch("components/head.html");
        this.innerHTML = await response.text();

    }

}

customElements.define("main-head", MainHead);

const siteName = "^^^";

if (!document.title.endsWith(` | ${siteName}`)) {
    document.title = `${document.title} | ${siteName}`;
}