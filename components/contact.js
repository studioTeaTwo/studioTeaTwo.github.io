export default class ContactComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <p>eメールかtwitterでお問い合わせください。twitterはDMを解放しています。</p>
      <p>studioTeaTwo@gmail.com</p>
      <p><a href="https://twitter.com/studioTeaTwo">@studioTeaTwo</a></p>
    `;
  }
}

customElements.define("x-contact", ContactComponent);
