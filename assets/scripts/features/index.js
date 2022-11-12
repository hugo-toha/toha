if (process.env.FEATURE_VIDEOPLAYER) {
  import('./videoplayer');
}

if (process.env.FEATURE_TOC) {
  import('./toc');
}

if (process.env.FEATURE_DARKMODE) {
  import('./darkmode');
}

if (process.env.FEATURE_FLOWCHART) {
  import('./flowchart');
}

if (process.env.FEATURE_SYNTAXHIGHLIGHT) {
  import('./syntaxhighlight');
}

if (process.env.FEATURE_MATH) {
  import('./math');
}

if (process.env.FEATURE_EMBEDPDF) {
  import('./embedpdf');
}
