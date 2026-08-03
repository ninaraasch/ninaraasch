export const GRID_GAP = 20;
export const GRID_COLUMNS = 12;

const TABLET_BREAKPOINT = 1000;
const MOBILE_BREAKPOINT = 700;

const SPANS = [1, 2, 3];

export function pageMargin(viewportWidth: number) {
  return viewportWidth <= MOBILE_BREAKPOINT ? 10 : 20;
}

export function navHeight(viewportWidth: number) {
  return viewportWidth <= MOBILE_BREAKPOINT ? 82 : 47;
}

export function teaserContainerWidth(viewportWidth: number) {
  return viewportWidth - pageMargin(viewportWidth) * 2;
}

export function teaserItemWidth(viewportWidth: number, span: number) {
  if (viewportWidth <= MOBILE_BREAKPOINT) {
    return (viewportWidth - 40) / 2;
  }
  if (viewportWidth <= TABLET_BREAKPOINT) {
    return (viewportWidth - 100) / 4;
  }
  const column = (viewportWidth - 260) / GRID_COLUMNS;
  return column * span + GRID_GAP * (span - 1);
}

export function spanForIndex(index: number) {
  const noise = Math.sin((index + 1) * 12.9898) * 43758.5453;
  const fraction = noise - Math.floor(noise);
  return SPANS[Math.floor(fraction * SPANS.length)];
}
