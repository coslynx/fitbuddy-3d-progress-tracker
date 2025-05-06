import * as THREE from 'three';
import clamp from 'lodash.clamp';

/**
 * Calculates the surface area of a sphere given its radius.
 * @param radius The radius of the sphere. Must be a number.
 * @returns The surface area of the sphere, formatted to two decimal places.
 * @throws {TypeError} If the input is not a number.
 */
function calculateSphereSurfaceArea(radius: number): number {
  if (typeof radius !== 'number') {
    throw new TypeError('Radius must be a number.');
  }

  const clampedRadius = THREE.MathUtils.clamp(radius, 0, 1000);
  const surfaceArea = 4 * Math.PI * clampedRadius * clampedRadius;
  return parseFloat(surfaceArea.toFixed(2));
}

/**
 * Converts degrees to radians.
 * @param degrees The angle in degrees. Must be a number.
 * @returns The angle in radians.
 * @throws {TypeError} If the input is not a number.
 */
function degreesToRadians(degrees: number): number {
  if (typeof degrees !== 'number') {
    throw new TypeError('Degrees must be a number.');
  }
  return THREE.MathUtils.degToRad(degrees);
}

/**
 * Creates a THREE.Color object from a base color string, applying a tint.
 * @param baseColor The base color string (e.g., '#ffffff').
 * @param tintAmount The amount of tint to apply (0 to 1).
 * @returns A THREE.Color object with the tint applied.
 */
function pbrColor(baseColor: string, tintAmount: number): THREE.Color {
  const clampedTintAmount = clamp(tintAmount, 0, 1);
  const color = new THREE.Color(baseColor);
  color.lerp(new THREE.Color('#ffffff'), clampedTintAmount);
  return color;
}

/**
 * Formats a number to a string with a specified number of decimal places.
 * @param number The number to format.
 * @param decimalPlaces The number of decimal places to use. Must be a non-negative integer. Defaults to 0.
 * @returns The formatted number as a string. Returns '0' if the input is invalid.
 */
function formatNumber(number: number, decimalPlaces: number = 0): string {
  if (typeof number !== 'number') {
    return '0';
  }

  if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0) {
    return '0';
  }

  return number.toFixed(decimalPlaces);
}

export { calculateSphereSurfaceArea, degreesToRadians, pbrColor, formatNumber };