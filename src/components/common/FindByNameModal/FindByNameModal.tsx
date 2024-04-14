import { Input, Modal, PaginationProps, Spin } from 'antd';
import './FindByNameModal.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FilmsGrid } from '@/components/routes/Films/components/FilmsGrid/FilmsGrid';
import FilmsAPI from '@/api/films';
import _ from 'lodash';
import { FilmsFromServer } from '@/store';
import { LoadingOutlined } from '@ant-design/icons';

export default function FindByNameModal({
  opened,
  onModalClose,
}: {
  opened: boolean;
  onModalClose: () => void;
}) {
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);
  const [films, setFilms] = useState<FilmsFromServer>({ docs: [], pages: 0 });
  const isFirstRender = useRef(true);

  const onPaginationChanged: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrentPage(page);
    setElementsPerPage(pageSize);
  };

  const getFilms = async (name: string, elementsPerPage: number, currentPage: number) => {
    setIsLoading(true)
    const films = (await FilmsAPI.getFilmsByName(name, elementsPerPage, currentPage)).data;
    setFilms({ docs: films.docs, pages: films.pages });
    setIsLoading(false);
  };

  const onNameChanged = useCallback(
    _.debounce(async (name: string, elementsPerPage: number) => {
      fetchFilms(name, elementsPerPage, 1);
    }, 1000),
    []
  );

  const fetchFilms = async (name: string, elementsPerPage: number, currentPage: number) => {
    if (name.length) {
      getFilms(name, elementsPerPage, currentPage);
    }
  };

  useEffect(() => {
    onNameChanged(name, elementsPerPage);
  }, [name]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      fetchFilms(name, elementsPerPage, currentPage);
    }
  }, [currentPage, elementsPerPage]);

  return (
    <>
      <Modal open={opened} footer={null} width={1300} onCancel={() => onModalClose()}>
        <div className='content-container'>
          <div className='title-1 text-bold text-white modal-title'>Поиск</div>
          <Input
            className='name-input'
            placeholder='Введите название...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            isLoading={isLoading}
            pages={films.pages}
            onCardClick={(id) => onModalClose()}
            onPaginationChanged={onPaginationChanged}
          />
        </div>
      </Modal>
    </>
  );
}
