---
title: "Resultados de Búsqueda"
date: 2010-06-08T08:06:25+06:00
weight: 999999
sitemap:
  priority : 0.1
layout: "search"
url: search
---


Este archivo existe únicamente para responder a la URL /search con la plantilla de diseño `search` relacionada.

No se muestra ningún contenido aquí, todo el contenido se basa en la plantilla layouts/page/search.html

Establecer una prioridad muy baja en el mapa del sitio le dirá a los motores de búsqueda que éste no es un contenido importante.

Esta implementación utiliza Fusejs, jquery y mark.js


## Configuración inicial

La búsqueda depende del tipo de contenido de salida adicional de JSON en config.toml

\```
[outputs]
  home = ["HTML", "JSON"]
\```

## Búsqueda de archivos adicionales

Para buscar campos adicionales definidos en el front matter, debes añadirlo en 2 lugares.

### Editar layouts/_default/index.JSON
Esto expone los valores en /index.json: por ejemplo, para agregar `categories`
\```
...
  "contents":{{ .Content | plainify | jsonify }}
  {{ if .Params.tags }},
  "tags":{{ .Params.tags | jsonify }}{{end}},
  "categories" : {{ .Params.categories | jsonify }},
...
\```

### Editar las opciones de fuse.js para buscar
`static/js/search.js`
\```
keys: [
  "title",
  "contents",
  "tags",
  "categories"
]
\```
