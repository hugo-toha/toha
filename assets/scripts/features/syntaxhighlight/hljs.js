import hljs from 'highlight.js'
import * as params from '@params'

const defaultOptions = {
  ignoreUnescapedHTML: true
}

hljs.configure({
    ...defaultOptions,
    ...(params.syntaxhighlight?.hljs || {}),
});
hljs.highlightAll();
