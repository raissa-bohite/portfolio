// Calculs purs du carrousel, séparés du DOM pour être testés

export function wrapIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}

// Distance signée la plus courte entre une carte et la carte active, sur une boucle
export function getCircularOffset(index: number, activeIndex: number, total: number): number {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export type CardPose = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
};

export function getCardPose(offset: number): CardPose {
  const distance = Math.abs(offset);
  const side = Math.sign(offset);
  if (distance === 0) return { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 10 };
  if (distance === 1) return { x: side * 72, y: 14, scale: 0.9, rotation: side * 3, opacity: 0.25, zIndex: 9 };
  return { x: side * 120, y: 24, scale: 0.8, rotation: side * 5, opacity: 0, zIndex: 8 };
}
