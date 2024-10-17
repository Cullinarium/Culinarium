import Hero from "@/components/homes/heros/Hero";
import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import React from "react";
import Preloader from "@/components/common/Preloader";

export const metadata = {
  title: "Culinarium",
};

export default function page() {
  return (
    <div className="main-content">
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <Hero />

        <Footer />
      </div>
    </div>
  );
}
