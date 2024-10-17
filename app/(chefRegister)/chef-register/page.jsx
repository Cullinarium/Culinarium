import ChefRegister from "@/components/chefRegister/ChefRegister";
import Preloader from "@/components/common/Preloader";

import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import React from "react";

export const metadata = {
  title: "Culinarium",
};

export default function Page() {
  return (
    <div className="main-content">
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <ChefRegister />
        <Footer />
      </div>
    </div>
  );
}
