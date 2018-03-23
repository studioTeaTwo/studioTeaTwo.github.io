export default class TabComponent extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', e => this.changeTab());
  }

  get tabIndex() {
    return this.getAttribute('tabIndex');
  }

  set tabIndex(val) {
    this.setAttribute('tabIndex', val);
  }

  changeTab() {
    this.switchTabIndex();
    this.switchTabPanel();
  }

  switchTabIndex() {
    const tabIndexes = document.querySelectorAll('x-tab');
    for (let element of tabIndexes) {
      if (this.tabIndex === element.getAttribute('tabIndex')) {
        this.setAttribute('selected', '');
      } else {
        element.removeAttribute('selected');
      }
    };
  }

  switchTabPanel() {
    const tabPanel = document.querySelector('#tab-panel');
    for (let element of tabPanel.children) {
      tabPanel.removeChild(element);
    };
    const activeTarget = document.createElement(`x-${this.tabIndex}`);
    tabPanel.appendChild(activeTarget);
  }
}

customElements.define("x-tab", TabComponent);
