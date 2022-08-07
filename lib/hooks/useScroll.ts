import BScroll, { Options } from "better-scroll";

export function useScroll(el: HTMLElement, options?: Options) {
  const defaultOptions: any = Object.assign({
    click: true,
    bounce: true,
    probeType: 3,
    mouseWheel: true,
    scrollY: true,
    scrollbar: {
      fade: false,
      interactive: true,
      scrollbarTrackClickable: true
    },
  }, options)
  return new BScroll(el, defaultOptions)
}
