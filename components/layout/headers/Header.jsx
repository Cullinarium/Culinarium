"use client";

import React, { useState, useEffect } from "react";
import Menu from "../component/Menu";
import MobileMenu from "../component/MobileMenu";
import Link from "next/link";
export default function Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`header -type-4 js-header ${
        scrollPosition > 40 ? "bg-white" : ""
      }`}
    >
      <div className="header__container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left d-flex items-center">
              <div className="header__logo pr-30 xl:pr-20 md:pr-0">
                <Link href="/">
                  <img
                    width={200}
                    height={20}
                    src="/assets/img/culinarium/logo.svg"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
          </div>

          <MobileMenu
            setActiveMobileMenu={setActiveMobileMenu}
            activeMobileMenu={activeMobileMenu}
          />

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              <div className="header-right__icons text-white d-flex items-center">
                <div className="d-none md:d-block pl-30 sm:pl-15">
                  <button
                    className="text-dark-1 items-center"
                    onClick={() => setActiveMobileMenu(true)}
                    data-el-toggle=".js-mobile-menu-toggle"
                  >
                    <i className="text-11 icon icon-mobile-menu"></i>
                  </button>
                </div>
              </div>

              <div className="header-right__buttons d-flex items-center ml-30 xl:ml-20 md:d-none">
                <Link
                  href="/chef-register"
                  className="button -rounded h-50 px-30 "
                  style={{ border: "1px solid black" }}
                >
                  Стать поваром
                </Link>
                <Link
                  href="/chefs"
                  className="button h-50 px-30 -rounded ml-15"
                  style={{
                    color: "#ffffff !important",
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
      </div>
    </header>
  );
}
