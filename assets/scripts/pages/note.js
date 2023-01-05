import imagesLoaded from 'imagesloaded'

document.addEventListener('DOMContentLoaded', function () {
  function resizeGridItem (item) {
    const grid = document.getElementsByClassName('note-card-holder')[0]
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
    const rowSpan = Math.ceil((item.querySelector('.item').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))
    item.style.gridRowEnd = 'span ' + rowSpan
  }

  function resizeAllGridItems () {
    const allItems = document.getElementsByClassName('note-card')
    for (let x = 0; x < allItems.length; x++) {
      resizeGridItem(allItems[x])
    }
  }

  function resizeInstance (instance) {
    const item = instance.elements[0]
    resizeGridItem(item)
  }

  window.addEventListener('resize', resizeAllGridItems)

  const allItems = document.getElementsByClassName('note-card')
  for (let x = 0; x < allItems.length; x++) {
    imagesLoaded(allItems[x], resizeInstance)
  }
})
