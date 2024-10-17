import NotFound from "@/components/not-found/NotFound";
import Preloader from "@/components/common/Preloader";
import EventsOne from "@/components/events/EventsOne";
import Footer from "@/components/layout/footers/Footer";
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
        <Footer />
      </div>
    </div>
  );
}
