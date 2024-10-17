"use client";

import React from "react";
import Links from "../component/Links";
import Socials from "@/components/common/Socials";

export default function Footer() {
  return (
    <footer className="footer -type-4 bg-white border-top-light">
      <div className="container">
        <div className="py-30 border-top-light-15">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="d-flex items-center h-100">
                <div>+996 709 775 004</div>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex items-center h-100">
                <Socials
                  componentsClass={"size-40 d-flex justify-center items-center"}
                />
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                <div>
                  <div className="d-flex x-gap-15">
                    <Links />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
