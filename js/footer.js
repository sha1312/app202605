class MainFooter extends HTMLElement {

    async connectedCallback() {

        const response = await fetch("components/footer.html");
        this.innerHTML = await response.text();

    }

}

customElements.define("main-footer", MainFooter);
