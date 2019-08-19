/* eslint-disable */
export default function (refsList) {
  if (refsList) {
    refsList.forEach((item, i) => {
      const itemWrapper = item.querySelector('.js-item-wrapper')
      const result = Math.ceil(itemWrapper.offsetHeight / 100)
      item.style.cssText = `grid-row-end:span ${result};`
    })
  }
}