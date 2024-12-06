"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function PinContentTwo({ chef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // useEffect hook to update the screen width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        id="js-pin-content"
        style={
          screenWidth < 991
            ? { height: "fit-content", right: "0%" }
            : { height: "100%", right: "7%" }
        }
        className="courses-single-info js-pin-content"
      >
        <div
          style={{ position: "sticky", top: "200px" }}
          className="bg-white shadow-2 rounded-8 border-light py-10 px-10"
        >
          <div className="courses-single-info__content scroll-bar-1 pt-30 pb-20 px-20">
            <div className="d-flex justify-between items-center mb-30">
              <div className="text-24 lh-1 text-dark-1 fw-500">
                от {chef?.minOrderPrice} сом
              </div>
            </div>

            {chef?.whatsapp && (
              <a href={`https://wa.me/${chef?.whatsapp}`} target="_blank">
                <button
                  className="button -md text-white w-1/1"
                  style={{
                    backgroundColor: "rgb(252,199,39)",
                  }}
                >
                  WhatsApp
                </button>
              </a>
            )}
            {chef?.instagram && (
              <a href={chef?.instagram} target="_blank">
                <button
                  className="button -md text-white w-1/1 mt-10"
                  style={{
                    backgroundColor: "#d94379",
                  }}
                >
                  Instagram
                </button>
              </a>
            )}
            <button
              onClick={() => setIsOpen(true)}
              className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10"
            >
              {isOpen ? chef?.phoneNumber : "Позвонить"}
            </button>
            <div className="mt-25">
              <div className="d-flex justify-between py-8 ">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-bar-chart-2"></div>
                  <div className="ml-10">Опыт работы</div>
                </div>
                <div>{chef?.workExperience}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div>
                    <Image
                      width={16}
                      height={17}
                      src="/assets/img/coursesCards/icons/5.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="ml-10">Город</div>
                </div>
                <div>{chef?.city}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-location"></div>
                  <div className="ml-10">Готов к выездам за город:</div>
                </div>
                <div>{chef?.readyToTravel ? "Да" : "Нет"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
