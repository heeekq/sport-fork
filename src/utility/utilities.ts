export function addLeadingZeros(num: number, totalLength: number): string {
  return String(num).padStart(totalLength, '0');
}
