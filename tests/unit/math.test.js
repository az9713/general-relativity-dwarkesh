import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  schwarzschildRadius,
  newtonianEscapeSpeed,
  staticRedshiftFactor,
  extractableEnergyFraction,
  tidalDeltaA,
  weakFieldDeflection,
  orbitalMass,
  compactness,
} from '../../src/utils/math.js';
import { C, G, SOLAR_MASS, SUN_RADIUS } from '../../src/utils/constants.js';

describe('schwarzschildRadius', () => {
  it('matches 2GM/c² for solar mass', () => {
    const rs = schwarzschildRadius(SOLAR_MASS);
    const expected = (2 * G * SOLAR_MASS) / (C * C);
    assert.ok(Math.abs(rs - expected) / expected < 1e-12);
    assert.ok(rs > 2000 && rs < 4000); // ~2.95 km
  });
  it('returns NaN for non-positive mass', () => {
    assert.ok(Number.isNaN(schwarzschildRadius(0)));
    assert.ok(Number.isNaN(schwarzschildRadius(-1)));
  });
});

describe('staticRedshiftFactor', () => {
  it('is defined only for r > rs', () => {
    const M = SOLAR_MASS;
    const rs = schwarzschildRadius(M);
    assert.ok(Number.isNaN(staticRedshiftFactor(M, rs)));
    assert.ok(Number.isNaN(staticRedshiftFactor(M, rs * 0.9)));
    const f = staticRedshiftFactor(M, 2 * rs);
    assert.ok(Math.abs(f - Math.SQRT1_2) < 1e-10);
  });
  it('approaches 1 at large r', () => {
    const f = staticRedshiftFactor(SOLAR_MASS, 1e12);
    assert.ok(f > 0.999);
  });
});

describe('extractableEnergyFraction', () => {
  it('equals 1 - sqrt(1 - rs/r)', () => {
    const M = SOLAR_MASS;
    const rs = schwarzschildRadius(M);
    const r = 4 * rs;
    const frac = extractableEnergyFraction(M, r);
    assert.ok(Math.abs(frac - (1 - Math.sqrt(1 - 0.25))) < 1e-10);
  });
});

describe('newtonianEscapeSpeed', () => {
  it('equals c at r = rs (clue scale)', () => {
    const M = SOLAR_MASS;
    const rs = schwarzschildRadius(M);
    const v = newtonianEscapeSpeed(M, rs);
    assert.ok(Math.abs(v - C) / C < 1e-10);
  });
});

describe('tidalDeltaA', () => {
  it('scales as M L / r³', () => {
    const a1 = tidalDeltaA(SOLAR_MASS, 1, 1e6);
    const a2 = tidalDeltaA(2 * SOLAR_MASS, 1, 1e6);
    assert.ok(Math.abs(a2 / a1 - 2) < 1e-10);
  });
});

describe('weakFieldDeflection', () => {
  it('is positive and small for solar limb scale', () => {
    const a = weakFieldDeflection(SOLAR_MASS, SUN_RADIUS);
    assert.ok(a > 0);
    const arcsec = a * (180 / Math.PI) * 3600;
    assert.ok(arcsec > 1.5 && arcsec < 2.0); // ~1.75"
  });
});

describe('orbitalMass', () => {
  it('recovers mass from Kepler form', () => {
    const M = 4e6 * SOLAR_MASS;
    const a = 1e14;
    const T = Math.sqrt((4 * Math.PI * Math.PI * a ** 3) / (G * M));
    const inferred = orbitalMass(a, T);
    assert.ok(Math.abs(inferred - M) / M < 1e-9);
  });
});

describe('compactness', () => {
  it('is rs/r', () => {
    const M = SOLAR_MASS;
    const rs = schwarzschildRadius(M);
    assert.ok(Math.abs(compactness(M, 2 * rs) - 0.5) < 1e-12);
  });
});
