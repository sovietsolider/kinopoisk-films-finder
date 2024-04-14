import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter';
import './Films.scss';
import { FilmType } from '@/components/routes/Film/types';
import FilmCard from './components/FilmCard/FilmCard';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { FilmsFilterType } from './components/FilmsFilter/types';
import { Pagination, PaginationProps, Skeleton, Spin } from 'antd';
import {
  storedFilms,
  storedCurrentPage,
  storedElementsPerPage,
  lastFilmsUrl,
} from '@/store/filmsPagination';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import _, { filter } from 'lodash';
import { difference } from '@/utils/deep-compare';
import FilmsAPI from '@/api/films';
import { filmsFilter } from '@/store';
import { FilmsGrid } from './components/FilmsGrid/FilmsGrid';
import { FilmsAdapter } from '@/adapters/films';
import { LoadingOutlined } from '@ant-design/icons';

export function Films() {
  const [searchParams, setSearchParams] = useSearchParams();
  const calculatePageLimit = () => {
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    return { page, limit };
  };

  const [films, setFilms] = useRecoilState<{ docs: FilmType[]; pages: number }>(storedFilms);
  const [isLoading, setIsLoading] = useState(true);

  const isFirstRender = useRef(true);
  const cachedPages = useRef<{
    [k: string]: { docs: never[]; pages: number; elementsPerPage: number };
  }>({});

  const [filmsFilter, setFilmsFilter] = useState<FilmsFilterType>(
    FilmsAdapter.filterFromQuery(searchParams)
  );
  const filmsFilterRef = useRef(FilmsAdapter.filterFromQuery(searchParams));

  const [currentPage, setCurrentPage] = useState(calculatePageLimit().page);
  const [elementsPerPage, setElementsPerPage] = useState(calculatePageLimit().limit);

  const [storedLastFilmsUrl, setStoredLastFilmsUrl] = useRecoilState(lastFilmsUrl);

  const isDeepChanged = (first: any, second: any) => {
    return !_.isEmpty(difference(_.cloneDeep(first), _.cloneDeep(second)));
  };
  const navigate = useNavigate();

  const getFilms = async (
    filter: FilmsFilterType,
    elementsPerPage: number,
    currentPage: number
  ) => {
    setIsLoading(true);
    if (
      cachedPages.current[currentPage] &&
      elementsPerPage === cachedPages.current[currentPage].elementsPerPage
    ) {
      setFilms(cachedPages.current[currentPage]);
    } else {
      const res = (await FilmsAPI.getFilms(elementsPerPage, currentPage, filter)).data;
      setFilms({ docs: res.docs, pages: res.pages });
      cachedPages.current[currentPage] = { docs: res.docs, pages: res.pages, elementsPerPage };
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      getFilms(filmsFilter, elementsPerPage, currentPage);
      setStoredLastFilmsUrl(
        `/films?${FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filmsFilter).toString()}`
      );
    }
  }, [
    filmsFilter.ageRating,
    filmsFilter.countries,
    filmsFilter.year,
    elementsPerPage,
    currentPage,
  ]);

  useEffect(() => {
    filmsFilterRef.current = filmsFilter;
  }, [filmsFilter]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page')) || 1);
    setElementsPerPage(Number(searchParams.get('limit')) || 10);
    setFilmsFilter(FilmsAdapter.filterFromQuery(searchParams));
  }, [searchParams]);

  useEffect(() => {
    //navigate('/films?'+FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filmsFilter), {replace: true})
    setSearchParams(FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filmsFilter));
  }, []);

  const onPaginationChanged = (page: number, pageSize: number) => {
    // if(page !== currentPage) {
    //   setCurrentPage(page)
    // }
    // if(pageSize !== elementsPerPage) {
    //   setElementsPerPage(pageSize)
    // }
    setSearchParams(FilmsAdapter.filmsFilterToServer(pageSize, page, filmsFilter));
  };

  const setFilmsFilterDebounced = useCallback(
    _.debounce(
      async (model: FilmsFilterType, limit) => {
        setSearchParams(FilmsAdapter.filmsFilterToServer(limit, 1, model));
        return model;
      },
      1000,
      { trailing: true }
    ),
    []
  );

  const onFilterChanged = (filter: FilmsFilterType) => {
    if (isDeepChanged(filmsFilterRef.current, filter)) {
      cachedPages.current = {};
      setFilmsFilterDebounced(filter, elementsPerPage);
    }
  };

  return (
    <>
      <div className='films-container'>
        <FilmsFilter model={filmsFilter} onFilterChanged={onFilterChanged} />
        { isLoading && <div className='films-loading-container text-white text-bold'>
          <span>
            <Spin
              style={{ marginRight: '0.5rem' }}
              indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
            />
            Загрузка
          </span>
        </div>}

        <FilmsGrid
          currentPage={currentPage}
          elementsPerPage={elementsPerPage}
          films={films.docs}
          pages={films.pages}
          isLoading={isLoading}
          onPaginationChanged={onPaginationChanged}
        />
      </div>
    </>
  );
}
