import Axios from 'axios';
import { useState, useEffect } from 'react';

export const extractParamFromUrl = (key, url) => {
  const splitted = url.split(`${key}=`)[1];

  if (splitted) {
    const paramMatch = splitted.match(/(.+)&/);
    if (paramMatch !== null) {
      return Number(paramMatch[1]);
    }
  }

  return null;
};

export const useDadosAbertos = (resource, paramsDefault = {}) => {
  const [params, setParams] = useState({
    itens: 20,
    pagina: 1,
    ordem: 'ASC',
    ...paramsDefault,
  });
  const [data, setData] = useState([
    //
  ]);
  const [firstPage, setFirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
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
    // eslint-disable-next-line
    for (const { rel, href } of links) {
      const page = extractParamFromUrl('pagina', href);

      if (!page) {
        // eslint-disable-next-line
        continue;
      }

      // eslint-disable-next-line
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

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        const {
          data: { dados, links },
        } = await Axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/${resource}`,
          {
            params,
          }
        );

        setData(dados);

        if (!Array.isArray(links)) {
          return;
        }

        updatePagination(links);
      } catch (e) {
        // do something?
      }

      setLoading(false);
    };

    fetch();
  }, [params, resource]);

  return {
    data,
    params,
    loading,
    setPage,
    setParam,
    nextPage,
    prevPage,
    lastPage,
    firstPage,
  };
};
