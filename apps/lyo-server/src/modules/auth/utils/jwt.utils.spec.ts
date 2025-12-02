import { parseExpiration } from './jwt.utils';

describe('parseExpiration', () => {
  it('should parse seconds correctly', () => {
    expect(parseExpiration('30s')).toBe(30);
    expect(parseExpiration('60s')).toBe(60);
  });

  it('should parse minutes correctly', () => {
    expect(parseExpiration('15m')).toBe(900); // 15 * 60
    expect(parseExpiration('30m')).toBe(1800); // 30 * 60
  });

  it('should parse hours correctly', () => {
    expect(parseExpiration('1h')).toBe(3600); // 1 * 3600
    expect(parseExpiration('2h')).toBe(7200); // 2 * 3600
  });

  it('should parse days correctly', () => {
    expect(parseExpiration('1d')).toBe(86400); // 1 * 86400
    expect(parseExpiration('7d')).toBe(604800); // 7 * 86400
  });

  it('should return default 900 for invalid format', () => {
    expect(parseExpiration('invalid')).toBe(900);
    expect(parseExpiration('15')).toBe(900);
    expect(parseExpiration('15x')).toBe(900);
    expect(parseExpiration('')).toBe(900);
  });

  it('should handle large values', () => {
    expect(parseExpiration('1000s')).toBe(1000);
    expect(parseExpiration('100m')).toBe(6000);
  });
});
