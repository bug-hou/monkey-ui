export function cssUnitConversion(unit: number | string | undefined): string {
  if (!unit) {
    return ""
  }
  const value = +unit;
  if (isNaN(value)) {
    return String(unit);
  } else {
    return value + "px"
  }
}
