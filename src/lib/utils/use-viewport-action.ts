// Thanks Lihau https://www.youtube.com/watch?v=1SKKzdHVvcI&t=182s

let intersectionObserver

function ensureIntersectionObserver() {
  if (intersectionObserver) return

  intersectionObserver = new IntersectionObserver(entries => {
    entries.filter(({isIntersecting}) => isIntersecting).forEach(entry => {
        entry.target.dispatchEvent(new CustomEvent('enterViewport'))
    })
  }, {
    rootMargin: "1000px"
  })
}

export default function viewport(element) {
  ensureIntersectionObserver()

  intersectionObserver.observe(element)

  return {
    destroy() {
      intersectionObserver.unobserve(element)
    },
  }
}
