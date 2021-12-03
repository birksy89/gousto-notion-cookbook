export function justNumbers(string: string): number {
  var numsStr = string.replace(/[^0-9]/g, "");
  return parseInt(numsStr);
}
