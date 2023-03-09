class ButtonCount extends HTMLElement {
	constructor () {
		super();
		this.count = 0;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `<button type="button">Times Clicked: ${this.count}</button>`;
		this.shadowRoot.addEventListener("click", () => {
			this.count++;
			this.shadowRoot.innerHTML = `<button type="button">Times Clicked: ${this.count}</button>`;
		});
	}
}
customElements.define("button-count", ButtonCount);