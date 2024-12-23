"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PaginationTwo from "../common/PaginationTwo";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "@/firebase";

export default function ChefsList() {
  const [pageNumber, setPageNumber] = useState(1);

  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "chefs"),
      (snapshot) => {
        let chefsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        chefsList = chefsList.filter((item) => item.isActive);

        setChefs(chefsList);
      },
      (error) => {
        setError("Failed to fetch chefs.");
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Повара</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          {chefs.length > 0 ? (
            <div className="row y-gap-30">
              {chefs
                .slice((pageNumber - 1) * 12, pageNumber * 12)
                .map((elm, i) => (
                  <Link
                    key={i}
                    className="col-xl-3 col-lg-4 col-md-6"
                    href={`/chefs/${elm.id}`}
                  >
                    <div>
                      <div className="coursesCard -type-1 ">
                        <div className="relative">
                          <div className="coursesCard__image overflow-hidden rounded-8">
                            {elm?.images?.[0] ? (
                              <Image
                                width={300}
                                height={300}
                                src={elm?.images[0]}
                                className="chef-card-image"
                                alt="image"
                              />
                            ) : (
                              <div
                                style={{
                                  backgroundColor: "#d5d4da",
                                }}
                                className="chef-card-image"
                              ></div>
                            )}
                            <div className="coursesCard__image_overlay rounded-8"></div>
                            <div className="coursesCard-footer__author__avatar">
                              <Image
                                width={60}
                                height={60}
                                src={elm?.avatar}
                                alt="image"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="coursesCard-footer"></div>

                        <div className="h-100 pt-15">
                          <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                            {elm.fullName}
                          </div>

                          <div className="d-flex x-gap-10 items-center pt-10">
                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <Image
                                  width={16}
                                  height={17}
                                  src="/assets/img/coursesCards/icons/4.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">
                                от {elm.minOrderPrice} сом
                              </div>
                            </div>

                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <Image
                                  width={16}
                                  height={17}
                                  src="/assets/img/coursesCards/icons/5.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">{elm.city}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <h5 className="text-center">Список поваров пока пуст</h5>
          )}

          <div className="row justify-center pt-90 lg:pt-50">
            <div className="col-auto">
              <PaginationTwo
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                data={chefs}
                pageCapacity={12}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
