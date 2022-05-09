export function processStyle(prefix: string, suffix: string, split: string, ...args: any[]) {
  let result = prefix + "";
  args.forEach(arg => result += arg + split)
  return result.slice(0, -1) + suffix;
}
