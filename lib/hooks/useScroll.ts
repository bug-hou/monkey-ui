import BScroll, { Options } from "better-scroll";

export function useScroll(el: HTMLElement, options?: Options) {
  const defaultOptions: any = Object.assign({
    click: true,
    bounce: true,
    probeType: 3,
    mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300
    },
    scrollY: true,
    scrollbar: true
  }, options)
  return new BScroll(el, defaultOptions)
}
