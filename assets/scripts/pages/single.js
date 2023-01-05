window.addEventListener('DOMContentLoaded', () => {
  // =========== Add anchor to the headers ================
  function addAnchor (element) {
    element.innerHTML = `<a href="#${element.id}" class="header-anchor">${element.innerHTML}<sup><i class="fas fa-link fa-sm"></i></sup></a>`
  }

  const postContent = document.getElementById('post-content')
  if (postContent != null) {
    const headerTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    for (let i = 0; i < headerTypes.length; i++) {
      const headers = postContent.querySelectorAll(headerTypes[i])
      if (headers) {
        headers.forEach(addAnchor)
      }
    }
  }

  // =============== Make TOC Compatible wit Bootstrap Scroll Spy ========
  // add "navbar" class to the "nav" element
  const toc = document.getElementById('TableOfContents')
  if (toc) {
    toc.classList.add('navbar')
    // add "nav-pills" class to the "ul" elements
    let elems = toc.getElementsByTagName('ul')
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.add('nav-pills')
    }
    // add "nav-item" class to the "li" elements
    elems = toc.getElementsByTagName('li')
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.add('nav-item')
    }
    // add "nav-link" class to the "a" elements
    elems = toc.getElementsByTagName('a')
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.add('nav-link')
    }
  }

  // add scroll to top button
  const btn = document.getElementById('scroll-to-top')

  if(btn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('show')
      } else {
        btn.classList.remove('show')
      }
    })
  
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  }
})
