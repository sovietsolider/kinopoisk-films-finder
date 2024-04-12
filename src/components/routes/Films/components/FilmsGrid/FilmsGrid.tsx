import { FilmType } from "@/components/routes/Film/types"
import { Pagination, PaginationProps } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FilmCard from "../FilmCard/FilmCard"

interface FilmsGridProps {
  isLoading: boolean,
  films: any[],
  currentPage: number,
  elementsPerPage: number,
  pages: number,
  onPaginationChanged: PaginationProps['onChange']
}

export function FilmsGrid({
  isLoading,
  films,
  currentPage,
  elementsPerPage,
  pages,
  onPaginationChanged
}: FilmsGridProps) {
  const navigate = useNavigate()
  const [loadedImagesCount, setLoadedImagesCount] = useState(0)

  const filmsListStyle: React.CSSProperties = {
    minHeight: `calc(${elementsPerPage / 5} * (10px + 360px)`
  }

  // useEffect(() => {
  // }, [loadedImagesCount])

  return <>
    <div className='films-list-container' style={filmsListStyle}>
      {
          films.map((film: FilmType, index: number) => (
            <FilmCard
              imgSrc={film.poster?.previewUrl ?? null}
              name={film?.name ?? ''}
              id={film.id}
              onCardClick={(id) => navigate(`/films/${id}`)}
              onLoad={() => { setLoadedImagesCount(prev => prev + 1) }}
            />
          ))
      }
    </div>
    <div className='pagination-container'>
      <Pagination
        showSizeChanger
        current={currentPage}
        pageSize={elementsPerPage}
        onChange={onPaginationChanged}
        defaultCurrent={1}
        total={pages * elementsPerPage}
        locale={{ items_per_page: "элементов" }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  </>
}