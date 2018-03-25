export default class ContactComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        p {
          word-wrap: break-word;
        }      
      </style>
      <p>eメールかtwitterでお問い合わせください。twitterはDMを解放しています。</p>
      <p>studioTeaTwo@gmail.com</p>
      <p><a href="https://twitter.com/studioTeaTwo">@studioTeaTwo</a></p>
    `;
  }
}

customElements.define("x-contact", ContactComponent);
