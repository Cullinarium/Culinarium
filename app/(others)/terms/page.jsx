import Preloader from "@/components/common/Preloader";

import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import Terms from "@/components/terms/Terms";
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
        <Terms />
        <Footer />
      </div>
    </div>
  );
}
