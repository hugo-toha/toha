if (navigator && navigator.clipboard) {
  addCopyButtons(navigator.clipboard)
} else {
  const script = document.createElement('script')
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js'
  script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94='
  script.crossOrigin = 'anonymous'
  script.onload = function () {
    addCopyButtons(clipboard)
  }

  document.body.appendChild(script)
}

function addCopyButtons(clipboard) {
  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    const button = document.createElement('a')
    button.className = 'copy-code-button'
    button.innerHTML = "<i class='fa-regular fa-copy'></i>"

    button.addEventListener('click', function () {
      clipboard.writeText(codeBlock.innerText)
    })

    const pre = codeBlock.parentNode
    if (pre.parentNode.classList.contains('highlight')) {
      const highlight = pre.parentNode
      highlight.parentNode.insertBefore(button, highlight)
    } else {
      pre.parentNode.insertBefore(button, pre)
    }
  })
}
