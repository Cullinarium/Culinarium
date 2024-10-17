"use client";

import Star from "../common/Star";

import { coursesData } from "@/data/courses";
import React, { useState, useEffect } from "react";

import Overview from "./Overview";
import PinContentTwo from "./PinContentTwo";
import { useNotification } from "@/context/NotificationContext";
import { database } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ChefDetails({ id }) {
  const [chef, setChef] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { showNotification } = useNotification();

  const fetchChef = async () => {
    setLoading(true);
    try {
      const docRef = doc(database, "chefs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setChef({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError("chef not found");
      }
    } catch (error) {
      showNotification(`Error fetching chef data: ${error}`, "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChef();
  }, [id]);

  return (
    <div id="js-pin-container" className="js-pin-container relative">
      <section className="page-header -type-5 bg-light-6">
        <div className="page-header__bg pb-50">
          <div
            className="bg-image js-lazy"
            data-bg="img/event-single/bg.png"
          ></div>
        </div>

        <div className="container">
          <div className="page-header__content pt-90 pb-90">
            <div className="row y-gap-30">
              <div className="col-xl-7 col-lg-8">
                <div className="d-flex items-center x-gap-20">
                  <div
                    className="bg-image size-90 rounded-full js-lazy"
                    style={{
                      backgroundImage: `url(${chef?.avatar})`,
                    }}
                  ></div>
                  <h1 className="text-30 lh-14 pr-60 lg:pr-0">
                    {chef?.fullName}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PinContentTwo chef={chef} />

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Overview chef={chef} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
