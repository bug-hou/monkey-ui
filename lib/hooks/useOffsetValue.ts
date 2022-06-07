export default function offsetValue(obj: any, direction: "left" | "top") {
  //将top,left首字母大写,并拼接成offsetTop,offsetLeft
  const offsetDir = 'offset' + direction[0].toUpperCase() + direction.substring(1);

  let realNum = obj[offsetDir];
  let positionParent = obj.offsetParent;  //获取上一级定位元素对象

  while (positionParent != null) {
    realNum += positionParent[offsetDir];
    positionParent = positionParent.offsetParent;
  }
  return realNum;
}
