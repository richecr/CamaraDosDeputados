import { describe, expect, it } from 'vitest';
import { extractParamFromUrl, getPaginationState } from './helpers';

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

describe('getPaginationState', () => {
  it('uses first and last API links for the available page range', () => {
    expect(
      getPaginationState(
        [
          { rel: 'first', href: 'https://api.example.test/items?pagina=1' },
          { rel: 'last', href: 'https://api.example.test/items?pagina=7' },
        ],
        3
      )
    ).toEqual({ firstPage: 1, lastPage: 7, totalPages: 7 });
  });

  it('infers a next page when the API omits its last link', () => {
    expect(
      getPaginationState(
        [{ rel: 'next', href: 'https://api.example.test/items?pagina=4' }],
        3
      )
    ).toEqual({ firstPage: 1, lastPage: 4, totalPages: 4 });
  });

  it('keeps the current page navigable when pagination links are omitted', () => {
    expect(getPaginationState([], 2)).toEqual({
      firstPage: 1,
      lastPage: 2,
      totalPages: 2,
    });
  });

  it('keeps a single-page response on page one', () => {
    expect(
      getPaginationState(
        [
          { rel: 'first', href: 'https://api.example.test/items?pagina=1' },
          { rel: 'last', href: 'https://api.example.test/items?pagina=1' },
        ],
        1
      )
    ).toEqual({ firstPage: 1, lastPage: 1, totalPages: 1 });
  });
});
