export function processStyle(style: number | string) {
  if (typeof style === "string") {
    if (isNaN(Number(style))) {
      return style;
    }
  }
  return style + "px";
}
