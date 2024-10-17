"use client";

import React from "react";
import EditProfile from "./EditProfile";

export default function Settings({ chefId }) {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Детали повара</h1>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="tabs -active-purple-2 js-tabs pt-0">
                <div className="tabs__content py-30 px-30 js-tabs-content">
                  <EditProfile chefId={chefId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
