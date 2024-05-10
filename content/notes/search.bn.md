---
title: "অনুসন্ধানের ফলাফল"
date: 2010-06-08T08:06:25+06:00
weight: 999999
sitemap:
  priority : 0.1
layout: "search"
url: search
---


This file exists solely to respond to /search URL with the related `search` layout template.

No content shown here is rendered, all content is based in the template layouts/page/search.html

Setting a very low sitemap priority will tell search engines this is not important content.

This implementation uses Fusejs and mark.js


## Initial setup

Search  depends on additional output content type of JSON in config.toml
\```
[outputs]
  home = ["HTML", "JSON"]
\```

## Searching additional fields

To search additional fields defined in front matter, you must add it in 2 places.

### Edit layouts/_default/index.JSON
This exposes the values in /index.json
i.e. add `category`
\```
...
  "contents":{{ .Content | plainify | jsonify }}
  {{ if .Params.tags }},
  "tags":{{ .Params.tags | jsonify }}{{end}},
  "categories" : {{ .Params.categories | jsonify }},
...
\```

### Edit fuse.js options to Search
`assets/scripts/pages/search.js`
\```
keys: [
  "title",
  "contents",
  "tags",
  "categories"
]
\```
