import { Input, Modal, Pagination, PaginationProps, Skeleton } from "antd";
import './FindByNameModal.scss'
import { useState } from "react";
import FilmCard from "@/components/routes/Films/components/FilmCard/FilmCard";
import { Film } from "@/components/routes/Films/components/FilmCard/types";

export default function FindByNameModal({ opened }: { opened: boolean }) {
  const [name, setName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, setElementsPerPage] = useState(10)
  const [films, setFilms] = useState([])

  const onPaginationChanged: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrentPage(page)
    setElementsPerPage(pageSize)
  }



  return <>
    <Modal
      open={opened}
      width={1300}
    >
      <div className="content-container">
        <div className="title-2 text-bold text-white modal-title">
          Поиск
        </div>
        <Input placeholder="Введите название..." value={name} onChange={(e) => setName(e.target.value)} />
        <div className='films-list-container'>
          {
            isLoading ? <Skeleton active={true}></Skeleton> :
              films.map((film: Film, index: number) => (
                <FilmCard imgSrc={film.poster.previewUrl} name={film.name} />
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
            total={50}
            locale={{ items_per_page: "элементов" }}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </div>
      </div>

    </Modal>
  </>
}