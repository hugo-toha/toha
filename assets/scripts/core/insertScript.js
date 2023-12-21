export const insertScript = (id, src, onload) => {
  // script is already inserted, do nothing
  if (document.getElementById(id)) return

  // insert script
  const firstScriptTag = document.getElementsByTagName('script')[0]
  const scriptTag = document.createElement('script')
  scriptTag.id = id
  scriptTag.onload = onload
  scriptTag.src = src
  scriptTag.defer = true
  scriptTag.async = true
  firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
}
