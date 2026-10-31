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

export const getPaginationState = (links = [], currentPage = 1) => {
  let firstPage = 1;
  let lastPage = null;
  let hasNextPage = false;

  for (const { rel, href } of links) {
    const page = extractParamFromUrl('pagina', href);

    if (rel === 'first' && page) firstPage = page;
    if (rel === 'last' && page) lastPage = page;
    if (rel === 'next' && page) hasNextPage = true;
  }

  if (lastPage === null) {
    lastPage = hasNextPage ? currentPage + 1 : Math.max(firstPage, currentPage);
  }

  return { firstPage, lastPage, totalPages: lastPage };
};

export const useDadosAbertos = (
  resource,
  paramsDefault = {
    itens: 20,
    pagina: 1,
    ordem: 'ASC',
  }
) => {
  const [params, setParams] = useState({ pagina: 1, ...paramsDefault });
  const [data, setData] = useState([
    //
  ]);
  const [firstPage, setFirstPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  const setParam = (key, value) => {
    setParams((currentParams) => ({
      ...currentParams,
      [key]: value,
      ...(key === 'pagina' ? {} : { pagina: 1 }),
    }));
  };

  const setPage = (page) => {
    const targetPage = Number(page);

    if (
      !Number.isInteger(targetPage) ||
      targetPage < firstPage ||
      (lastPage > 0 && targetPage > lastPage)
    ) {
      return;
    }

    setParam('pagina', targetPage);
  };

  const nextPage = () => {
    setPage(params.pagina + 1);
  };

  const prevPage = () => {
    setPage(params.pagina - 1);
  };

  const retry = () => {
    setRequestId((currentRequestId) => currentRequestId + 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      setLoading(true);
      setError(null);

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
        const pagination = getPaginationState(
          paginationLinks,
          params.pagina || 1
        );

        setFirstPage(pagination.firstPage);
        setLastPage(pagination.lastPage);
        setTotalPages(pagination.totalPages);
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
