import Preloader from "@/components/common/Preloader";
import ChefDetails from "@/components/chefDetails/ChefDetails";
import Footer from "@/components/layout/footers/Footer";

import Header from "@/components/layout/headers/Header";
import React from "react";

export const metadata = {
  title: "Culinarium",
};

export default function page({ params }) {
  <Preloader />;
  return (
    <div className="main-content  ">
      <Header />
      <div className="content-wrapper  js-content-wrapper ">
        <ChefDetails id={params.id} />
        <Footer />
      </div>
    </div>
  );
}
