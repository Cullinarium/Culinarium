"use client";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ImageLightBox from "./ImageLightBox";

export default function Overview({ chef }) {
  const swiperRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const [pageItems, setpageItems] = useState([]);

  const [currentItem, setCurrentItem] = useState({});
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currentSlideIndex + 1);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const handlePaginationClick = (index) => {
    setCurrentSlideIndex(index);

    if (swiperRef.current) {
      swiperRef.current.slideTo(index + 1);
    }
  };

  const handleSlideChange = (swiper) => {
    if (swiper.activeIndex > 4) {
      if (currentSlideIndex < swiper.activeIndex) {
        setCurrentSlideIndex(0);
      }
    } else if (swiper.activeIndex < 1) {
      setCurrentSlideIndex(3);
    } else {
      setCurrentSlideIndex(swiper.activeIndex - 1);
    }
  };

  return (
    <div id="overview" className="to-over">
      <h4 className="text-18 fw-500">О поваре</h4>
      <div className={`show-more  mt-30 js-show-more is-active`}>
        <div className="show-more__content ">
          <p className="">{chef?.selfDescription}</p>
        </div>
      </div>
      <div className="mt-60">
        <h4 className="text-20 mb-30">Основная информация</h4>
        <div className="row x-gap-100 justfiy-between">
          <div className="col-md-6">
            <div className="y-gap-20">
              <div className="d-flex items-center">
                <div className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ transform: "scale(0.7)", opacity: "0.7" }}
                  />
                </div>
                <p>Основная кухня: {chef?.mainCuisines}</p>
              </div>

              <div className="d-flex items-center">
                <div className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ transform: "scale(0.7)", opacity: "0.7" }}
                  />
                </div>
                <p>
                  Дополнительные кухни:{" "}
                  {chef?.additionalCuisines ? chef?.additionalCuisines : "-"}
                </p>
              </div>

              <div className="d-flex items-center">
                <div className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ transform: "scale(0.7)", opacity: "0.7" }}
                  />
                </div>
                <p>Языки: {chef?.languages}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="y-gap-20">
              <div className="d-flex items-center">
                <div className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ transform: "scale(0.7)", opacity: "0.7" }}
                  />
                </div>
                <p>
                  Максимум гостей: {chef?.maxGuests ? chef?.maxGuests : "-"}
                </p>
              </div>

              <div className="d-flex items-center">
                <div className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ transform: "scale(0.7)", opacity: "0.7" }}
                  />
                </div>
                <p>
                  График работы: {chef?.workSchedule ? chef?.workSchedule : "-"}
                </p>
              </div>

              <div className="d-flex items-center">
                <div className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ transform: "scale(0.7)", opacity: "0.7" }}
                  />
                </div>
                <p>Меню: {chef?.menu}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-60">
        <h4 className="text-20 mb-30">Блюда повара</h4>
        <div className="col-lg-6" style={{ margin: "0 auto" }}>
          <div className="js-shop-slider">
            <div className="shopSingle-preview__image js-slider-slider">
              {showSlider && (
                <Swiper
                  className="overflow-visible"
                  modules={[Navigation, Pagination]}
                  loop={true}
                  spaceBetween={0}
                  speed={1000}
                  slidesPerView={1}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={handleSlideChange}
                >
                  {chef?.images?.map((elm, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <div className="swiper-slide">
                        <span
                          data-barba
                          className="gallery__item js-gallery"
                          data-gallery="gallery1"
                        >
                          <div className="ratio ratio-63:57">
                            <Image
                              width={690}
                              height={625}
                              className="absolute-full-center rounded-8"
                              src={elm}
                              alt="project image"
                            />
                          </div>

                          <div
                            className="gallery__button -bottom-right"
                            onClick={() => setActiveLightBox(true)}
                          >
                            <FontAwesomeIcon
                              style={{
                                fontWeight: 800,
                                fontSize: "20px",
                                color: "#fff",
                              }}
                              icon={faPlus}
                            />
                          </div>
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="row y-gap-10 x-gap-10 pt-10 js-slider-pagination">
              {chef?.images?.map((elm, i) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePaginationClick(i)}
                  key={i}
                  className="col-auto gallery__item"
                >
                  <Image
                    width={90}
                    height={90}
                    style={{ objectFit: "cover" }}
                    className="size-90 object-cover rounded-8"
                    src={elm}
                    alt="project image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {chef?.images && (
        <ImageLightBox
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
          setActiveLightBox={setActiveLightBox}
          activeLightBox={activeLightBox}
          images={chef?.images}
        />
      )}
    </div>
  );
}
