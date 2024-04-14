import { Input, Modal, Pagination, PaginationProps, Skeleton } from "antd";
import './FindByNameModal.scss'
import { useCallback, useEffect, useRef, useState } from "react";
import FilmCard from "@/components/routes/Films/components/FilmCard/FilmCard";
import { FilmType } from "@/components/routes/Film/types"
import { FilmsGrid } from "@/components/routes/Films/components/FilmsGrid/FilmsGrid";
import FilmsAPI from "@/api/films";
import _ from 'lodash'
import { FilmsFromServer } from "@/store";

export default function FindByNameModal({ opened, onModalClose }: { opened: boolean, onModalClose: () => void }) {
  const [name, setName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, setElementsPerPage] = useState(10)
  const [films, setFilms] = useState<FilmsFromServer>({docs: [], pages: 0})
  const isFirstRender= useRef(true)

  const onPaginationChanged: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrentPage(page)
    setElementsPerPage(pageSize)
  }

  const getFilms = async (name: string, elementsPerPage: number, currentPage: number) => {
    const films = (await FilmsAPI.getFilmsByName(name, elementsPerPage, currentPage)).data
    setFilms({docs: films.docs, pages: films.pages})
  }

  const onNameChanged = useCallback(
    _.debounce(async (name: string, elementsPerPage: number) => {
      fetchFilms(name, elementsPerPage, 1)
    }, 1000), []
  )

  const fetchFilms = async (name: string, elementsPerPage: number, currentPage: number) => {
    if(name.length) {
      setIsLoading(true)
      getFilms(name, elementsPerPage, currentPage)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    onNameChanged(name, elementsPerPage)
  }, [name])

  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      fetchFilms(name, elementsPerPage, currentPage)
    }
  }, [currentPage, elementsPerPage])

  return <>
    <Modal
      open={opened}
      footer={null}
      width={1300}
      onCancel={() => onModalClose()}
    >
      <div className="content-container">
        <div className="title-1 text-bold text-white modal-title">
          Поиск
        </div>
        <Input className="name-input" placeholder="Введите название..." value={name} onChange={(e) => setName(e.target.value)} />
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
}