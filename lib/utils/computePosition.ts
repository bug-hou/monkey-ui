export function computedPosition(el: HTMLElement): "top" | "bottom" {
  const { top } = el.getBoundingClientRect();
  const availHeight = window.innerHeight;
  return top > availHeight - top ? "top" : "bottom";
}
