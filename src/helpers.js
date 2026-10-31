import axios from 'axios';
import { useState, useEffect } from 'react';

export const extractParamFromUrl = (key, url) => {
  try {
    const value = new URL(
      url,
      'https://dadosabertos.camara.leg.br'
    ).searchParams.get(key);
    const number = Number(value);

    return value !== null && value !== '' && Number.isFinite(number)
      ? number
      : null;
  } catch {
    return null;
  }
};

export const useDadosAbertos = (
  resource,
  paramsDefault = {
    itens: 20,
    pagina: 1,
    ordem: 'ASC',
  }
) => {
  const [params, setParams] = useState(paramsDefault);
  const [data, setData] = useState([
    //
  ]);
  const [firstPage, setFirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  const setParam = (key, value) => {
    setParams((currentParams) => ({
      ...currentParams,
      [key]: value,
    }));
  };

  const setPage = (page) => {
    /**
     * Skip if page is greater than last page or less than first page.
     */
    if (page > lastPage || page < firstPage) {
      return;
    }

    setParam('pagina', page);
  };

  const nextPage = () => {
    setPage(params.pagina + 1);
  };

  const prevPage = () => {
    setPage(params.pagina - 1);
  };

  const updatePagination = (links) => {
    for (const { rel, href } of links) {
      const page = extractParamFromUrl('pagina', href);

      if (!page) {
        continue;
      }

      switch (rel) {
        case 'first':
          setFirstPage(page);
          break;
        case 'last':
          setLastPage(page);
          break;
      }
    }
  };

  const retry = () => {
    setRequestId((currentRequestId) => currentRequestId + 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      setLoading(true);
      setError(null);
      setFirstPage(0);
      setLastPage(0);
      setTotalPages(0);

      try {
        const {
          data: { dados, links },
        } = await axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/${resource}`,
          {
            params,
            signal: controller.signal,
          }
        );

        if (controller.signal.aborted) return;

        setData(dados);
        const paginationLinks = Array.isArray(links) ? links : [];
        const lastPageUrl = paginationLinks.find((link) => link.rel === 'last');

        setTotalPages(
          lastPageUrl ? extractParamFromUrl('pagina', lastPageUrl.href) || 0 : 0
        );
        updatePagination(paginationLinks);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetch();

    return () => controller.abort();
  }, [params, resource, requestId]);

  return {
    data,
    params,
    loading,
    error,
    retry,
    setPage,
    setParam,
    nextPage,
    prevPage,
    lastPage,
    firstPage,
    totalPages,
  };
};
