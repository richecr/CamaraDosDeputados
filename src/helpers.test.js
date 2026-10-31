import { describe, expect, it } from 'vitest';
import { extractParamFromUrl } from './helpers';

describe('extractParamFromUrl', () => {
  it('reads a numeric pagination parameter from an API link', () => {
    expect(
      extractParamFromUrl(
        'pagina',
        'https://api.example.test/deputados?pagina=3&itens=20'
      )
    ).toBe(3);
  });

  it('returns null when the requested parameter is absent', () => {
    expect(
      extractParamFromUrl(
        'pagina',
        'https://api.example.test/deputados?itens=20'
      )
    ).toBeNull();
  });

  it('reads a parameter when it is the final query value', () => {
    expect(
      extractParamFromUrl(
        'pagina',
        'https://api.example.test/deputados?itens=20&pagina=8'
      )
    ).toBe(8);
  });

  it('returns null for an invalid URL', () => {
    expect(extractParamFromUrl('pagina', 'not a URL')).toBeNull();
  });
});
