import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/scss";
import "swiper/css/effect-coverflow";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "swiper/css/scrollbar";

import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const SingleProductLeft = () => {
  //   ===================== STATES ==========================

  const [slideEnd, setSlideEnd] = useState(false);

  return (
    <>
      <div className="image_carousel">
        <Swiper
          className="image_preview"
          slidesPerView={1}
          spaceBetween={1}
          grabCursor={true}
          centeredSlides={false}
          loop={false}
          direction="horizontal"
          pagination={{
            el: ".paginators",
            clickable: true,
          }}
          navigation={{
            nextEl: ".btn_right",
            prevEl: ".btn_left",
            clickable: true,
          }}
          breakpoints={{
            610: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
          }}
          onReachEnd={() => setSlideEnd(true)}
          modules={[EffectCoverflow, Pagination, Navigation, Scrollbar]}
        >
          <SwiperSlide>
            <img src={image1} alt="cloth only" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image2} alt="cloth on model" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image1} alt="cloth only" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image2} alt="cloth on model" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image1} alt="cloth only" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image2} alt="cloth on model" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="image_pagination">
        <button type="button" className="pagination_btn btn_left">
          <AiOutlineArrowLeft size={25} />
        </button>
        <div className="paginators"></div>
        <button
          type="button"
          className="pagination_btn btn_right"
          disabled={slideEnd}
        >
          <AiOutlineArrowRight size={25} />
        </button>
      </div>
    </>
  );
};

export default SingleProductLeft;
