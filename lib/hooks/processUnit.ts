export const processUnit = (unit: number | string) => {
  console.log(unit)
  if (typeof unit === "string") {
    if (isNaN(Number(unit))) {
      return unit;
    }
  }
  return unit + 'px'
}
