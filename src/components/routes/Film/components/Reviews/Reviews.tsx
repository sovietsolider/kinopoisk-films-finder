import { Pagination, Typography } from "antd";
import { ReviewType } from "../../types";
import './Reviews.scss'
import { Badge } from "@/components/common/Badge/Badge";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { reviewTypes } from "@/types/dicts";
import React, { useEffect, useRef, useState } from "react";
import ReactShowMoreText from "react-show-more-text";

interface ReviewsProps {
  reviews: ReviewType[]
  pages: number
  currentPage: number
  elementsPerPage: number
  onPageChanged: (page: number, pageSize: number) => void
}

export default function Reviews({ reviews, pages, currentPage, onPageChanged, elementsPerPage }: ReviewsProps) {
  const isEllipsisActive: (e: HTMLDivElement) => boolean = (e) => {
    console.dir(e)
    return (e.offsetHeight < e.scrollHeight);
  }

  const [overflowStatus, setOverflowStatus] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<any>(false);

  const reviewRefs = useRef<any[]>([]);
  reviewRefs.current = reviews.map((_, i) => reviewRefs.current[i] ?? React.createRef());


  const reviewStyle: (review: ReviewType) => React.CSSProperties = (review) => {
    if (review.type === reviewTypes.positive) {
      return { backgroundColor: 'green' }
    } else if (review.type === reviewTypes.negative) {
      return { backgroundColor: 'red' }
    }
    return {}
  }



  useEffect(() => {
    const status = reviewRefs.current.map(ref =>
      ref.current ? isEllipsisActive(ref.current) : false
    );
    setOverflowStatus(status);
  }, [reviews]);

  return <>
    <div className="title-2 text-bold reviews-title">
      Рецензии пользователей
    </div>
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div key={review.id} className="reviews-item-container rounded-border-1">
          <div className="reviews-item-title">
            <Badge value={review.type === reviewTypes.positive ? <LikeOutlined /> : <DislikeOutlined />} iconStyle={reviewStyle(review)}>
              {review.author}
            </Badge>
            <div>
              {new Date(review.date).toLocaleDateString("ru")}
            </div>
          </div>
          <div className="text-bold title-3">
            {review.title}
          </div>
          <div className="reviews-item-review" >
            <ReactShowMoreText
              lines={10}
              more="Показать весь"
              less="Скрыть"
              expanded={expanded}
              onClick={(expanded) => setExpanded(expanded)}
              truncatedEndingComponent={"... "}
              anchorClass="reviews-item-review-show-moreless"
            >
              <span className="reviews-item-review-text" dangerouslySetInnerHTML={{ __html: review.review }} />
            </ReactShowMoreText>

          </div>
          {/* {overflowStatus[index] &&
            <div className="text-bold">Показать полностью</div>
          } */}
        </div>
      ))}
    </div>
    <div className='pagination-container'>
      <Pagination
        current={currentPage}
        pageSize={elementsPerPage}
        onChange={onPageChanged}
        defaultCurrent={1}
        total={pages * elementsPerPage}
        locale={{ items_per_page: "элементов" }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  </>
}