export class Section {
  constructor({renderer}, sectionSelector) {
    this._renderer = renderer;
    this._sectionSelector = sectionSelector;
    this._container = document.querySelector(`.${this._sectionSelector}`)
  }

  addItem = (item) => {
    this._container.prepend(this._renderer(item))
  }

  renderItems = (items) => {
    items.forEach((item) => {
      this.addItem(item)
    })
  }
}
