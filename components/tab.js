export default class TabComponent extends HTMLElement {
  get tabId() {
    return this.getAttribute('tabId');
  }

  set tabId(val) {
    this.setAttribute('tabId', val);
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host([selected]) {
          border-bottom: solid 6px #aac5de;
        }
      </style>
      <slot></slot>
    `;
  }

  connectedCallback() {
    this._changeTab = this.changeTab.bind(this);
    this.addEventListener('click', this._changeTab);

    if (this.hasAttribute('selected')) {
      this._switchTabPanel();
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._changeTab);
  }

  changeTab(e) {
    this._switchTabIndex();
    this._switchTabPanel();
  }

  _switchTabIndex() {
    const tabIndexes = document.querySelectorAll('x-tab');
    for (let element of tabIndexes) {
      if (this.tabId === element.getAttribute('tabId')) {
        this.setAttribute('selected', '');
      } else {
        element.removeAttribute('selected');
      }
    };
  }

  _switchTabPanel() {
    const tabPanel = document.querySelector('#tab-panel');
    for (let element of tabPanel.children) {
      tabPanel.removeChild(element);
    };
    const activeTarget = document.createElement(`x-${this.tabId}`);
    tabPanel.appendChild(activeTarget);
  }
}

customElements.define("x-tab", TabComponent);
