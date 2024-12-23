import Faq from "@/components/common/Faq";
import Preloader from "@/components/common/Preloader";

import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import HelpCenter from "@/components/others/HelpCenter";
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
        <HelpCenter />
        <Faq />
        <Footer />
      </div>
    </div>
  );
}
