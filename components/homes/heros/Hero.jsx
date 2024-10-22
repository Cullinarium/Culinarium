"use client";
import dynamic from "next/dynamic";
const ParticleComponent = dynamic(() => import("../Particals"), {
  ssr: false,
});

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="masthead -type-6">
        <div className="masthead__bg" style={{ zIndex: "-1" }}>
          <Image
            width={470}
            style={{ pointerEvents: "none" }}
            height={540}
            src="/assets/img/home-7/hero/1.svg"
            alt="blob"
          />
          <Image
            width={580}
            style={{ pointerEvents: "none" }}
            height={920}
            src="/assets/img/home-7/hero/2.svg"
            alt="blob"
          />
          <Image
            width={1200}
            height={1200}
            style={{ pointerEvents: "none", width: "100%" }}
            src="/assets/img/home-7/hero/bg.png"
            alt="background"
          />

          <div
            className="absolute-full-center"
            style={{ maxHeight: "100vh", overflow: "hidden" }}
          >
            <ParticleComponent />
          </div>
        </div>

        <div className="container">
          <div className="row y-gap-50 items-center">
            <div className="col-lg-5" data-aos="fade-up" data-aos-delay="500">
              <div className="masthead__content">
                <h1 className="masthead__title">
                  Найдите <br />
                  <span style={{ color: "rgb(252,199,39)" }}> шеф-повара</span>
                </h1>
                <h1 className="masthead__title">Для вашего мероприятия</h1>
                <div className="row items-center x-gap-20 y-gap-20 pt-20">
                  <div className="col-auto">
                    <Link
                      href="/chefs"
                      className="button -md  -rounded text-white"
                      style={{
                        backgroundColor: "rgb(252,199,39)",
                        fontWeight: "bold",
                      }}
                    >
                      Найти шеф-повара
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7" data-aos="fade-up" data-aos-delay="750">
              <div className="masthead__image relative d-flex justify-content-center">
                <img
                  style={{
                    borderRadius: "40px",
                    boxShadow: "0px 0px 18px 11px rgba(252,199,39,0.71)",
                  }}
                  src="/assets/img/culinarium/culinarium.svg"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
