import NotFound from "@/components/not-found/NotFound";
import Preloader from "@/components/common/Preloader";

import Header from "@/components/layout/headers/Header";
import React from "react";

export const metadata = {
  title: "Culinarium",
};

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <NotFound />
      </div>
    </div>
  );
}
