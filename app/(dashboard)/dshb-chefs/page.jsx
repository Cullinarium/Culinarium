import Preloader from "@/components/common/Preloader";
import ChefsListAdmin from "@/components/dashboard/ChefsListAdmin";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";

export const metadata = {
  title: "Culinarium",
};

export default function page() {
  return (
    <div className="barba-container" data-barba="container">
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <ChefsListAdmin />
          </div>
        </div>
      </main>
    </div>
  );
}
