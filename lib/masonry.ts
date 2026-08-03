export type MasonryInput = {
  width: number;
  height: number;
};

export type MasonryBox = MasonryInput & {
  x: number;
  y: number;
};

export type MasonryLayout = {
  boxes: MasonryBox[];
  height: number;
};

type FreeSpace = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const TOLERANCE = 0.01;

function fits(item: MasonryInput, space: FreeSpace) {
  return (
    item.width - TOLERANCE <= space.width && item.height - TOLERANCE <= space.height
  );
}

function overlaps(box: MasonryBox, space: FreeSpace) {
  return (
    space.x < box.x + box.width &&
    space.x + space.width > box.x &&
    space.y < box.y + box.height &&
    space.y + space.height > box.y
  );
}

function contains(outer: FreeSpace, inner: FreeSpace) {
  return (
    inner.x >= outer.x &&
    inner.y >= outer.y &&
    inner.x + inner.width <= outer.x + outer.width &&
    (outer.height === Infinity || inner.y + inner.height <= outer.y + outer.height)
  );
}

function splitAroundBox(spaces: FreeSpace[], box: MasonryBox, gap: number) {
  for (let index = spaces.length - 1; index >= 0; index--) {
    const space = spaces[index];
    if (!overlaps(box, space)) continue;

    const spaceRight = space.x + space.width;
    const spaceBottom = space.y + space.height;
    const boxRight = box.x + box.width;
    const boxBottom = box.y + box.height;

    if (space.y < box.y) {
      spaces.push({
        x: space.x,
        y: space.y,
        width: space.width,
        height: box.y - space.y - gap,
      });
    }
    if (boxRight < spaceRight) {
      spaces.push({
        x: boxRight + gap,
        y: space.y,
        width: spaceRight - boxRight - gap,
        height: space.height,
      });
    }
    if (boxBottom < spaceBottom) {
      spaces.push({
        x: space.x,
        y: boxBottom + gap,
        width: space.width,
        height: spaceBottom - boxBottom - gap,
      });
    }
    if (space.x < box.x) {
      spaces.push({
        x: space.x,
        y: space.y,
        width: box.x - space.x - gap,
        height: space.height,
      });
    }

    spaces.splice(index, 1);
  }
}

function prune(spaces: FreeSpace[], gap: number) {
  for (let index = spaces.length - 1; index >= 0; index--) {
    if (spaces[index].width < gap || spaces[index].height < gap) {
      spaces.splice(index, 1);
      continue;
    }
    for (let other = 0; other < spaces.length; other++) {
      if (other !== index && contains(spaces[other], spaces[index])) {
        spaces.splice(index, 1);
        break;
      }
    }
  }
  spaces.sort((a, b) => b.y - a.y || b.x - a.x);
}

export function packMasonry(
  items: MasonryInput[],
  containerWidth: number,
  gap: number,
): MasonryLayout {
  const spaces: FreeSpace[] = [
    { x: 0, y: 0, width: containerWidth, height: Infinity },
  ];
  const boxes: MasonryBox[] = [];
  let height = 0;

  for (const item of items) {
    const box: MasonryBox = { x: 0, y: 0, width: item.width, height: item.height };

    for (let index = spaces.length - 1; index >= 0; index--) {
      const space = spaces[index];
      if (!fits(item, space)) continue;

      box.x = space.x;
      box.y = space.y;

      if (space.width - item.width > 0) {
        spaces.push({
          x: space.x + item.width + gap,
          y: space.y,
          width: space.width - item.width - gap,
          height: space.height,
        });
      }
      if (space.height - item.height > 0) {
        spaces.push({
          x: space.x,
          y: space.y + item.height + gap,
          width: space.width,
          height: space.height - item.height - gap,
        });
      }

      spaces.splice(index, 1);
      break;
    }

    boxes.push(box);
    height = Math.max(height, box.y + box.height);
    splitAroundBox(spaces, box, gap);
    prune(spaces, gap);
  }

  return { boxes, height };
}
