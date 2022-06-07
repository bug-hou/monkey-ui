import { readonly, ref } from "vue"

export const getScrollPosition = (element: any = window) => {
  const scrollY = ref(0);
  const scrollX = ref(0);
  let callback = () => { };
  const setScroll = () => {
    scrollY.value = element.scrollY;
    scrollX.value = element.scrollX;
  }
  if (element) {
    element.addEventListener("scroll", setScroll)
    callback = () => {
      element.removeEventListener("scroll", setScroll)
    }
  }
  return {
    y: readonly(scrollY),
    x: readonly(scrollX),
    callback,
  }
}

export const setScrollPosition = (duration = 1000, element = window) => {
  // 对value进行立方
  const cubic = (value: number) => Math.pow(value, 3);
  const easeInOutCubic = (value: number) => value < 0.5
    ? cubic(value * 2) / 2
    : 1 - cubic((1 - value) * 2) / 2;
  const beginTime = Date.now();
  const beginValue = element.scrollY;
  // 判断使用什么动画
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
  const frameFunc = () => {
    // 移动时间
    const progress = (Date.now() - beginTime) / duration;
    if (progress < 1) {
      element.scrollTo(0, beginValue * (1 - easeInOutCubic(progress)))
      rAF(frameFunc);
    } else {
      element.scrollTo(0, 0);
    }
  };
  rAF(frameFunc);
}

