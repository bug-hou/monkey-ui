type Rgbc = [number, number, number];

//hex颜色转rgb颜色
function HexToRgb(str: string) {
  str = str.replace("#", "");
  // 划分为连个为一组
  let hxs = str.match(/[0-9A-F]{2}/g).map((item) => parseInt(item, 16)) as Rgbc;
  return hxs;
}
//GRB颜色转Hex颜色
function RgbToHex(a: number, b: number, c: number) {
  var hexs = [a.toString(16), b.toString(16), c.toString(16)];
  for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
  return "#" + hexs.join("");
}

//得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
export function getDarkColor(color: string, level: number) {
  let rgbc = HexToRgb(color).map((item) =>
    Math.floor(item * (1 - level))
  ) as Rgbc;
  return RgbToHex(...rgbc);
}
//得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
export function getLightColor(color: string, level: number) {
  let rgbc = HexToRgb(color).map((item) =>
    Math.floor((255 - item) * level + item)
  ) as Rgbc;
  return RgbToHex(...rgbc);
}
