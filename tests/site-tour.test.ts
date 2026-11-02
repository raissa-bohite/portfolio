import { describe, expect, it } from 'vitest';
import {
  BASE_SCROLL_SPEED,
  LONG_PAGE_SCROLL_SPEED,
  getNavPoint,
  getNextPageIndex,
  getPageHeightAtCaptureWidth,
  getScrollDuration,
  getScrollSpeed,
  getTourProgress
} from '@/lib/site-tour';

describe('getPageHeightAtCaptureWidth', () => {
  it('ramène la hauteur de la capture à une page de 1440 px de large', () => {
    // Arrange
    const imageWidth = 2880;
    const imageHeight = 6000;

    // Act
    const height = getPageHeightAtCaptureWidth(imageWidth, imageHeight);

    // Assert
    expect(height).toBe(3000);
  });

  it('renvoie 0 pour une largeur nulle', () => {
    // Arrange, Act
    const height = getPageHeightAtCaptureWidth(0, 1000);

    // Assert
    expect(height).toBe(0);
  });
});

describe('getScrollSpeed', () => {
  it('garde la vitesse de base pour une page courte, sur l’écran de référence', () => {
    // Arrange : page de 2000 px à 1440 px de large
    const imageWidth = 1440;
    const imageHeight = 2000;

    // Act
    const speed = getScrollSpeed(imageWidth, imageHeight, 800);

    // Assert
    expect(speed).toBe(BASE_SCROLL_SPEED);
  });

  it('double la vitesse au-delà de 4000 px de haut', () => {
    // Arrange : page de 8000 px à 1440 px de large
    const imageWidth = 1440;
    const imageHeight = 8000;

    // Act
    const speed = getScrollSpeed(imageWidth, imageHeight, 800);

    // Assert
    expect(speed).toBe(LONG_PAGE_SCROLL_SPEED);
  });

  it('suit la largeur de l’écran pour garder le même rythme visuel', () => {
    // Arrange
    const halfScreenWidth = 400;

    // Act
    const speed = getScrollSpeed(1440, 2000, halfScreenWidth);

    // Assert
    expect(speed).toBe(BASE_SCROLL_SPEED / 2);
  });
});

describe('getScrollDuration', () => {
  it('divise la distance par la vitesse', () => {
    // Arrange, Act
    const duration = getScrollDuration(900, 45);

    // Assert
    expect(duration).toBe(20);
  });

  it('renvoie 0 quand il n’y a rien à faire défiler', () => {
    // Arrange, Act
    const duration = getScrollDuration(-10, 45);

    // Assert
    expect(duration).toBe(0);
  });
});

describe('getNavPoint', () => {
  it('convertit les pourcentages en pixels à partir de la largeur de l’écran', () => {
    // Arrange
    const navX = 50;
    const navY = 3;

    // Act
    const point = getNavPoint(navX, navY, 800);

    // Assert
    expect(point).toEqual({ x: 400, y: 24 });
  });
});

describe('getNextPageIndex', () => {
  it('passe à la page suivante', () => {
    // Arrange, Act
    const next = getNextPageIndex(1, 4);

    // Assert
    expect(next).toBe(2);
  });

  it('revient à la première page après la dernière', () => {
    // Arrange, Act
    const next = getNextPageIndex(3, 4);

    // Assert
    expect(next).toBe(0);
  });
});

describe('getTourProgress', () => {
  it('additionne les pages vues et l’avancement de la page en cours', () => {
    // Arrange, Act
    const progress = getTourProgress(1, 0.5, 4);

    // Assert
    expect(progress).toBe(0.375);
  });

  it('borne l’avancement de la page entre 0 et 1', () => {
    // Arrange, Act
    const progress = getTourProgress(3, 2, 4);

    // Assert
    expect(progress).toBe(1);
  });
});
