export function calculateDomain(
  data: Array<number>
): { min: number, max: number } {
  const max = Math.max(...data);
  const min = Math.min(...data);

  if (min > 0 || max < 0) {
    return { min, max };
  }

  const biggest = Math.max(max, Math.abs(min));
  return { min: -biggest, max: biggest };
}
