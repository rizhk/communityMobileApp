export function range(min: number, max: number, step = 1, hasUnlimited = false) {
  const length = Math.floor((max - min) / step) + 1 + (hasUnlimited ? 1 : 0);
  const arr = Array.from({ length }, (_, i) => {
    const n = min + i * step;
    return { value: n.toString(), label: n.toString() };
  });
  if (hasUnlimited) arr[length - 1] = { value: "", label: "∞" };
  return arr;
}
