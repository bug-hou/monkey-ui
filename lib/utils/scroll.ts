/*
获取到滚动高度
*/
import { readonly, ref } from "vue";

function scrollParent(element: HTMLElement): HTMLElement | null {
  const parent = element.parentElement;
  if (!parent) {
    return null;
  }
  const style = getComputedStyle(parent);
  const client = parent.clientHeight;
  const scroll = parent.scrollHeight;
  if (parent.nodeName === "HTML" || parent.nodeName === "BODY") {
    if (client < scroll) {
      return parent;
    } else {
      scrollParent(parent);
    }
  }
  if (client < scroll && (style.overflow !== "visible")) {
    return parent;
  } else {
    return scrollParent(parent);
  }
}

export function useScroll(element: HTMLElement) {
  const parentScroll = scrollParent(element);
  if (!parentScroll) {
    return;
  }
  const scrollPos = () => {
    const scroll = ref(0);
    const setScroll = (e: any) => {
      scroll.value = parentScroll.scrollTop;
    }

    parentScroll.addEventListener("scroll", setScroll)
    const callback = () => {
      parentScroll.removeEventListener("scroll", setScroll)
    }
    return {
      scroll: readonly(scroll),
      callback,
    }
  }

  const scrollTop = (duration = 1000) => {
    // 对value进行立方
    const cubic = (value: number) => Math.pow(value, 3);
    const easeInOutCubic = (value: number) => value < 0.5
      ? cubic(value * 2) / 2
      : 1 - cubic((1 - value) * 2) / 2;
    const beginTime = Date.now();
    const beginValue = parentScroll.scrollTop;
    // 判断使用什么动画
    const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
    const frameFunc = () => {
      // 移动时间
      const progress = (Date.now() - beginTime) / duration;
      if (progress < 1) {
        parentScroll.scrollTo(0, beginValue * (1 - easeInOutCubic(progress)))
        rAF(frameFunc);
      } else {
        parentScroll.scrollTo(0, 0);
      }
    };
    rAF(frameFunc);
  }
  return {
    scrollPos,
    scrollTop
  }
}


