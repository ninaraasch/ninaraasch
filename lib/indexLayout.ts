export type IndexImage = {
  width: number;
  height: number;
};

export type IndexRow<T> = {
  items: { item: T; index: number }[];
  height: number;
};

const GAP = 20;
const PORTRAIT_RATIO = 0.8;
const MOBILE_BREAKPOINT = 700;

export function indexMetrics(viewportWidth: number) {
  const isMobile = viewportWidth <= MOBILE_BREAKPOINT;
  const margin = isMobile ? 10 : 20;
  const columns = isMobile ? 2 : 7;
  const containerWidth = viewportWidth - margin * 2;
  const targetHeight =
    (containerWidth - (columns - 1) * GAP) / columns / PORTRAIT_RATIO;

  return { containerWidth, targetHeight, gap: GAP };
}

export function justifyRows<T extends IndexImage>(
  items: T[],
  containerWidth: number,
  gap: number,
  targetHeight: number,
): IndexRow<T>[] {
  const rows: IndexRow<T>[] = [];
  let current: { item: T; index: number }[] = [];
  let ratioSum = 0;

  items.forEach((item, index) => {
    current.push({ item, index });
    ratioSum += item.width / item.height;

    const rowWidth = ratioSum * targetHeight + (current.length - 1) * gap;
    if (rowWidth >= containerWidth) {
      const available = containerWidth - (current.length - 1) * gap;
      rows.push({ items: current, height: available / ratioSum });
      current = [];
      ratioSum = 0;
    }
  });

  if (current.length > 0) {
    rows.push({ items: current, height: targetHeight });
  }

  return rows;
}
