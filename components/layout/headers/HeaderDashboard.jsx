"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function HeaderDashboard() {
  useEffect(() => {
    if (window.innerWidth < 990) {
      document
        .getElementById("dashboardOpenClose")
        .classList.add("-is-sidebar-hidden");
    }
    const handleResize = () => {
      if (window.innerWidth < 990) {
        document
          .getElementById("dashboardOpenClose")
          .classList.add("-is-sidebar-hidden");
      }
    };

    // Add event listener to window resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="header -dashboard -dark-bg-dark-1 js-header">
        <div className="header__container py-20 px-30">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="header__explore text-dark-1">
                  <button
                    onClick={() => {
                      document
                        .getElementById("dashboardOpenClose")
                        .classList.toggle("-is-sidebar-hidden");
                    }}
                    className="d-flex items-center js-dashboard-home-9-sidebar-toggle"
                  >
                    <i className="icon -dark-text-white icon-explore"></i>
                  </button>
                </div>

                <div className="header__logo ml-30 md:ml-20">
                  <Link data-barba href="/">
                    <Image
                      width={140}
                      height={50}
                      className="-light-d-none"
                      src="/assets/img/general/logo.svg"
                      alt="logo"
                    />
                    <Image
                      width={140}
                      height={50}
                      className="-dark-d-none"
                      src="/assets/img/general/logo-dark.svg"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
