export default class AboutComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  getContentBiography() {
    return fetch('/contents/biography.json', {credentials: "include"})
      .then(res => res.json())
      .then(json => json.description)
      .catch(error => console.error(error));
  }

  getContentList(category) {
    return fetch(`/contents/${category}.json`, {credentials: "include"})
      .then(res => res.json())
      .then(json => json[`${category}`])
      .catch(error => console.error(error));
  }

  createList(contents) {
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    contents.forEach(content => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = content.title
      a.href = content.url;
      li.appendChild(a);
      ul.appendChild(li);
    });
    fragment.appendChild(ul);
    return fragment;
  }

  render() {
    this.innerHTML = `
      <section id="biography">
        <h2>Biography</h2> 
      </section>
      <section id="products">
        <h2>Products</h2>
      </section>
      <section id="slides">
        <h2>Slides</h2>
      </section>
      <section id="articles">
        <h2>Articles</h2>
      </section>
    `;

    this.getContentBiography().then(content => {
      const section = document.querySelector('#biography');
      const p = document.createElement('p');
      p.textContent = content
      section.appendChild(p);
    });

    ['products', 'slides', 'articles'].forEach(category => {
      this.getContentList(category).then(content => {
        const section = document.querySelector(`#${category}`);
        const fragment = this.createList(content);
        section.appendChild(fragment);
      })
    });
  }
}

customElements.define("x-about", AboutComponent);
