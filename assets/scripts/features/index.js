if (process.env.FEATURE_VIDEOPLAYER === '1') {
  import('./videoplayer')
}

if (process.env.FEATURE_TOC === '1') {
  import('./toc')
}

if (process.env.FEATURE_DARKMODE === '1') {
  import('./darkmode')
}

if (process.env.FEATURE_FLOWCHART === '1') {
  import('./flowchart')
}

if (process.env.FEATURE_SYNTAXHIGHLIGHT === '1') {
  import('./syntaxhighlight')
}

if (process.env.FEATURE_MATH === '1') {
  import('./math')
}

if (process.env.FEATURE_EMBEDPDF === '1') {
  import('./embedpdf')
}
