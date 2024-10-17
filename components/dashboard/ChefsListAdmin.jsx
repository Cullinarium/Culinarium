"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "@/firebase";
import { useRouter } from "next/navigation";

const formatDate = (isoDate) => {
  if (!isoDate) return;

  const dateObj = new Date(isoDate);

  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  console.log(day, month, year);

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return formattedDate;
};

export default function ChefsListAdmin() {
  const [chefs, setChefs] = useState([]);

  const router = useRouter();

  const handleRowClick = (chefId) => {
    router.push(`/dshb-chefs/${chefId}`);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "chefs"),
      (snapshot) => {
        const chefsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setChefs(chefsList);
      },
      (error) => {
        setError("Failed to fetch chefs.");
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Повара</h1>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="py-30 px-30">
                <div>
                  <div className="px-30 py-20 bg-light-7 -dark-bg-dark-2 rounded-8">
                    <div className="row x-gap-10 text-center">
                      <div className="col-lg-4">
                        <div className="text-purple-1">ФИО</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-purple-1">Город</div>
                      </div>
                      <div className="col-lg-1">
                        <div className="text-purple-1">Статус</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-purple-1">Цена</div>
                      </div>
                      <div className="col-lg-3">
                        <div className="text-purple-1">Номер телефона</div>
                      </div>
                    </div>
                  </div>

                  {chefs.map((elm, i) => (
                    <div
                      key={i}
                      className="px-30 border-bottom-light cursor-pointer"
                      onClick={() => handleRowClick(elm.id)}
                    >
                      <div className="row x-gap-10 items-center py-15">
                        <div className="col-lg-4">
                          <div className="d-flex items-center">
                            <Image
                              width={40}
                              height={40}
                              src={elm?.avatar}
                              alt="image"
                              className="size-40 fit-cover"
                            />
                            <div className="ml-10">
                              <div className="text-dark-1 lh-12 fw-500">
                                {elm.fullName}
                              </div>
                              <div className="text-14 lh-12 mt-5">
                                {formatDate(elm.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2 text-center">{elm.city}</div>

                        <div className="col-lg-1 d-flex justify-content-center">
                          {elm.isActive ? (
                            <div
                              style={{
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%",
                                backgroundColor: "green",
                              }}
                            ></div>
                          ) : (
                            <div
                              style={{
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%",
                                backgroundColor: "red",
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="col-lg-2 text-center">
                          {elm.minOrderPrice}
                        </div>
                        <div className="col-lg-3 text-center">
                          {elm.phoneNumber}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
