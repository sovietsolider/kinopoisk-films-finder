import { Input, Modal, Pagination, PaginationProps, Skeleton } from "antd";
import './FindByNameModal.scss'
import { useCallback, useEffect, useState } from "react";
import FilmCard from "@/components/routes/Films/components/FilmCard/FilmCard";
import { Film } from "@/components/routes/Films/components/FilmCard/types";
import { FilmsGrid } from "@/components/routes/Films/Films";
import FilmsAPI from "@/api/films";
import _ from 'lodash'

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

  const onNameChanged = useCallback(
    _.debounce(async (name: string) => {
      setFilms((await FilmsAPI.getFilmsByName(name, elementsPerPage, currentPage)).data.docs)
    }, 3000), []
  )

  useEffect(() => {
    onNameChanged(name)
  }, [name])

  const fetchFilms = async () => {
    setIsLoading(true)
    setFilms((await FilmsAPI.getFilmsByName(name, elementsPerPage, currentPage)).data.docs)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchFilms()
  }, [currentPage, elementsPerPage])

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
        <FilmsGrid 
          currentPage={currentPage} 
          elementsPerPage={elementsPerPage}
          films={films}
          isLoading={isLoading}
          onPaginationChanged={onPaginationChanged} 
        />
      </div>

    </Modal>
  </>
}