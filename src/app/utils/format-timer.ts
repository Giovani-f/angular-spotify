export function milissecondsToMinutes(milisseconds: number) {
  const minutes = Math.floor(milisseconds / 60000);
  const seconds = ((milisseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
}
