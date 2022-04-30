//hex颜色转rgb颜色
function HexToRgb(str: string) {
  str = str.replace("#", "");
  // 划分为连个为一组
  let hxs = str.match(/[0-9A-F]{2}/ig).map((item) => parseInt(item, 16));
  return hxs;
}

//得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
export function getDarkColor(color: string, level: number = 0.7) {
  return processColor(color, level, (num, level) => Math.floor(num * (1 - level)))
}
//得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
export function getLightColor(color: string, level: number = 0.7) {
  return processColor(color, level, (num, level) => Math.floor((255 - num) * level + +num))
}

function processColor(color: string, level: number, processFn: (num: number, level: number) => number) {
  if (color) {
    return;
  }
  let lightColor = "#";
  let colors: number[];
  if (color.startsWith("rgb")) {
    const reg = /rgb\((\d{3}),(\d{3}),(\d{3})\)/;
    const match = reg.exec(color);
    colors = [+match["1"], +match["2"], +match["3"]]
  } else {
    colors = HexToRgb(color);
  }
  lightColor += colors.map((item) => {
    const str = processFn(item, level).toString(16);
    return ('00' + str).slice(str.length);
  }
  ).join("");
  return lightColor;
}
