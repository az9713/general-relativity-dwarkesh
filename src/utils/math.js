import { G, C } from './constants.js';

/** Schwarzschild radius r_s = 2GM/c² */
export function schwarzschildRadius(massKg) {
  if (!(massKg > 0) || !Number.isFinite(massKg)) return NaN;
  return (2 * G * massKg) / (C * C);
}

/** Newtonian escape speed sqrt(2GM/r). Invalid / not GR for r ≤ r_s. */
export function newtonianEscapeSpeed(massKg, radiusM) {
  if (!(massKg > 0) || !(radiusM > 0)) return NaN;
  return Math.sqrt((2 * G * massKg) / radiusM);
}

/**
 * Static Schwarzschild redshift / time-dilation factor sqrt(1 - r_s/r).
 * Defined only for r > r_s. Returns NaN on or inside the horizon.
 */
export function staticRedshiftFactor(massKg, radiusM) {
  const rs = schwarzschildRadius(massKg);
  if (!(radiusM > rs)) return NaN;
  return Math.sqrt(1 - rs / radiusM);
}

/** Idealized extractable energy fraction when lowering to radius r: 1 - sqrt(1 - r_s/r). */
export function extractableEnergyFraction(massKg, radiusM) {
  const f = staticRedshiftFactor(massKg, radiusM);
  if (!Number.isFinite(f)) return NaN;
  return 1 - f;
}

/** Newtonian tidal acceleration difference approx Δa ≈ 2GML/r³ */
export function tidalDeltaA(massKg, lengthM, radiusM) {
  if (!(massKg > 0) || !(lengthM > 0) || !(radiusM > 0)) return NaN;
  return (2 * G * massKg * lengthM) / (radiusM ** 3);
}

/** Weak-field light deflection α ≈ 4GM/(b c²) in radians. */
export function weakFieldDeflection(massKg, impactParameterM) {
  if (!(massKg > 0) || !(impactParameterM > 0)) return NaN;
  return (4 * G * massKg) / (impactParameterM * C * C);
}

/** Circular-orbit mass inference M ≈ 4π² a³ / (G T²) */
export function orbitalMass(semiMajorAxisM, periodS) {
  if (!(semiMajorAxisM > 0) || !(periodS > 0)) return NaN;
  return (4 * Math.PI * Math.PI * semiMajorAxisM ** 3) / (G * periodS * periodS);
}

/** Compactness r_s / r for an object of mass M and radius r. */
export function compactness(massKg, radiusM) {
  const rs = schwarzschildRadius(massKg);
  if (!(radiusM > 0) || !Number.isFinite(rs)) return NaN;
  return rs / radiusM;
}

export function formatSci(n, digits = 3) {
  if (!Number.isFinite(n)) return '—';
  if (Math.abs(n) === 0) return '0';
  return n.toExponential(digits);
}

export function formatNumber(n, digits = 3) {
  if (!Number.isFinite(n)) return '—';
  if (Math.abs(n) >= 1e4 || (Math.abs(n) > 0 && Math.abs(n) < 1e-2)) {
    return formatSci(n, digits);
  }
  return n.toLocaleString(undefined, { maximumSignificantDigits: digits + 2 });
}
