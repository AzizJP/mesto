export class Section {
  constructor({items, renderer}, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._sectionSelector = sectionSelector;
    this._container = document.querySelector(`.${this._sectionSelector}`)
  }

  addItem = (item) => {
    this._container.prepend(this._renderer(item))
  }

  rendererAll = () => {
    this._items.forEach((item) => {
      this.addItem(item)
    })
  }
}
