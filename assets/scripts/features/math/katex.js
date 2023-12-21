import renderMathInElement from 'katex/contrib/auto-render'
import * as params from '@params'

const defaultOptions = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '\\[', right: '\\]', display: true },
    { left: '$', right: '$', display: false },
    { left: '\\(', right: '\\)', display: false }
  ]
}

window.addEventListener('DOMContentLoaded', () => {
  renderMathInElement(
    document.body,
    {
      ...defaultOptions,
      ...(params.math?.katex || {})
    }
  )
})
