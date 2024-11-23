"use client";

import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { database } from "@/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useNotification } from "@/context/NotificationContext";

export default function ChefRegister() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    whatsapp: "",
    instagram: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requiredFields = [
      "fullName",
      "phoneNumber",
      "instagram",
      "city",
      "whatsapp",
    ];

    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        showNotification("Заполните все обязательные поля");
        setLoading(false);
        return;
      }
    }

    try {
      const timestamp = Date.now();

      const newFormData = {
        ...formData,
        isActive: false,
        createdAt: new Date(timestamp).toISOString(),
      };

      await addDoc(collection(database, "chefs"), newFormData);

      router.push("/chefs");
      showNotification("Данные отправлены", "success");
    } catch (err) {
      showNotification(err?.message || "Ошибка при отправке данных", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row x-gap-60 y-gap-30 mt-50">
          <div className="container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="d-flex flex-wrap justify-content-center row y-gap-30">
                {/* Full Name */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    ФИО <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="fullName"
                      placeholder="ФИО"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Номер телефона <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="phoneNumber"
                      placeholder="996 700 123 456"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Whatsapp */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Whatsapp <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="whatsapp"
                      placeholder="996 700 123 456"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Instagram <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="instagram"
                      placeholder="Ваш instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* City */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Город <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="city"
                      placeholder="Ваш город работы"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row justify-content-center x-gap-20 y-gap-20 pt-20">
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="button -md -rounded text-white"
                      style={{ backgroundColor: "rgb(252,199,39)" }}
                      disabled={loading}
                    >
                      {loading ? "Отправка..." : "Отправить"}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="col-12 mt-20">
                    <p className="text-red-500">{error}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
