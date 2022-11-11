if (process.env.FEATURE_VIDEOPLAYER) {
  import('./videoplayer');
}

if (process.env.FEATURE_TOC) {
  import('./toc');
}
