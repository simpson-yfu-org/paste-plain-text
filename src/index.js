
export const paste = {
  mounted(el, {  arg }) {
    el.$pasteArg = arg
    const handler = e => {
      e.preventDefault()
      const clipboardData = e.clipboardData || window.clipboardData
      let text = clipboardData.getData('text/plain')
      if (el.$pasteArg === 'nofw') {
        text = text.replace(/[\uff01-\uff5e]/g, function(ch) {
          return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
        });
      }
      el.value = text
    }
    el.addEventListener('paste', handler)
    el.$destroyReload = () => el.removeEventListener('click', handler)
  },

  beforeUnmount(el) {
    el.$destroyReload()
  },

  updated(el, { arg }) {
    el.$pasteArg = arg
  },
}
