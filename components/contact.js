export default class ContactComponent extends HTMLElement {
  static get observedAttributes() {
    return ['active'];
  }

  get active() {
    return this.hasAttribute('active');
  }

  set active(val) {
    if (val) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  attributeChangedCallback(active, oldValue, newValue) {
    if (this.active) {
      this._render();
    } else {
      this.shadowRoot.innerHTML = '';
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        #contentsSlot::slotted(p) {
          word-wrap: break-word;
        }
        #contentsSlot::slotted(oo-button) {
          margin-bottom: 10px;
        } 
      </style>
      <slot id="contentsSlot"></slot>
    `;
  }
}

customElements.define("x-contact", ContactComponent);
