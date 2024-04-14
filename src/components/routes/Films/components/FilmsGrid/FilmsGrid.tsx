import { FilmType } from '@/components/routes/Film/types';
import { Pagination, PaginationProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilmCard from '../FilmCard/FilmCard';
import './FilmsGrid.scss';
import useWindowDimensions from '@/components/hooks/useWindowDimensions';

interface FilmsGridProps {
  isLoading: boolean;
  films: any[];
  currentPage: number;
  elementsPerPage: number;
  pages: number;
  onCardClick?: (id: number) => void;
  onPaginationChanged: PaginationProps['onChange'];
}

export function FilmsGrid({
  isLoading,
  films,
  currentPage,
  elementsPerPage,
  pages,
  onCardClick,
  onPaginationChanged,
}: FilmsGridProps) {
  const navigate = useNavigate();
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  // useEffect(() => {
  // }, [loadedImagesCount])

  return (
    <>
      <div className='films-grid-list-container'>
        {films.map((film: FilmType, index: number) => (
          <FilmCard
            key={film.id}
            imgSrc={film.poster?.previewUrl ?? null}
            name={film?.name ?? ''}
            id={film.id}
            onCardClick={(id) => {
              navigate(`/films/${id}`), onCardClick && onCardClick(id);
            }}
            onLoad={() => {
              setLoadedImagesCount((prev) => prev + 1);
            }}
          />
        ))}
      </div>
      <div className='films-grid-pagination-container'>
        <Pagination
          showSizeChanger
          current={currentPage}
          pageSize={elementsPerPage}
          onChange={onPaginationChanged}
          defaultCurrent={1}
          total={pages * elementsPerPage}
          locale={{ items_per_page: 'элементов' }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </div>
    </>
  );
}
