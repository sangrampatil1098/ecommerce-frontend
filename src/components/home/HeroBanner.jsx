import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  // A11y,
  Autoplay,
} from "swiper/modules";
import { bannerList } from "../../utils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

const HeroBanner = () => {
  return (
    <div className="py-2 rounded-md">
      <Swiper
        grabCursor
        modules={[Pagination, Scrollbar, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {bannerList.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[index]}`}
            >
              <div className="flex items-center justify-center">
                <div className="hidden lg:flex justify-center w-1/2 p-8">
                  <div className="text-center">
                    <h3 className="text-3xl text-white font-bold">
                      {item.title}
                    </h3>
                    <h2 className="text-5xl font-bold text-white mt-2">
                      {item.subtitle}
                    </h2>
                    <p className="text-white font-bold mt-4">
                      {item.description}
                    </p>

                    <Link
                      className="mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                      to={"/products"}
                    >
                      shop
                    </Link>
                  </div>
                </div>
                <div className="w-full flex justify-center lg:w-1/2">
                  <img src={item?.image} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
