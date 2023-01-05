import mermaid from 'mermaid'
import * as params from '@params'

const mermaidOptions = params.flowchart?.mermaid || {}
const options = Object.assign({}, mermaidOptions, { startOnLoad: true })

mermaid.initialize(options)
