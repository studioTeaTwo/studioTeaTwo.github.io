export default class AboutComponent extends HTMLElement {
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

  _getContentBiography() {
    return fetch('/contents/biography.json', {credentials: "include"})
      .then(res => res.json())
      .then(json => json.description)
      .catch(error => console.error(error));
  }

  _getContentList(category) {
    return fetch(`/contents/${category}.json`, {credentials: "include"})
      .then(res => res.json())
      .then(json => json[`${category}`])
      .catch(error => console.error(error));
  }

  _createList(contents) {
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    contents.forEach(content => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      if (content.lang) {
        content.title = `<${content.lang === 'ja' ? '日本語': '英語'}>${content.title}`
      }
      a.textContent = content.title;
      a.href = content.url;
      li.appendChild(a);
      ul.appendChild(li);
    });
    fragment.appendChild(ul);
    return fragment;
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        ul {
          list-style:none;
        }
        ul li {
          margin-bottom: 0.5em;
        }
        ul li:last-child {
          margin-bottom: 0px;
        }
        ul>li>a {
          color: #000;
          text-decoration: none;
          background: linear-gradient(transparent 70%, #aac5de 0%);
        }
        p {
          word-wrap: break-word;
        }  
      </style>
      <section id="biography">
        <slot name="biography"></slot>
      </section>
      <section id="products">
        <slot name="products"></slot>
      </section>
      <section id="slides">
        <slot name="slides"></slot>
      </section>
      <section id="articles">
        <slot name="articles"></slot>
      </section>
    `;

    this._getContentBiography().then(content => {
      const section = this.shadowRoot.querySelector('section#biography');
      const p = document.createElement('p');
      p.textContent = content;
      section.appendChild(p);
    });

    ['products', 'slides', 'articles'].forEach(category => {
      this._getContentList(category).then(content => {
        const section = this.shadowRoot.querySelector(`section#${category}`);
        const fragment = this._createList(content);
        section.appendChild(fragment);
      })
    });
  }
}

customElements.define("x-about", AboutComponent);
