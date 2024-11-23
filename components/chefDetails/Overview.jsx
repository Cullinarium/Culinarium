"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { learnList, requirements } from "@/data/aboutcourses";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
export default function Overview({ chef }) {
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

        <div className="y-gap-10 x-gap-10">
          {chef?.images?.map((item) => (
            <img
              width={100}
              height={100}
              className="col-10 col-xs-8 col-sm-8 col-md-4 "
              src={item}
              alt="menu"
              loading="lazy"
              style={{
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
