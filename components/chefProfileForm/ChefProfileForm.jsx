"use client";

import React, { useState } from "react";

function ChefProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    whatsapp: false,
    experience: "",
    primaryCuisine: "",
    additionalCuisines: "",
    aboutMe: "",
    languages: "",
    profilePicture: null,
    dishPhotos: [],
    minOrderPrice: "",
    maxGuests: "",
    workSchedule: "",
    city: "",
    menuOptions: "",
    additionalServices: "",
    willingnessToTravel: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleMultiFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      dishPhotos: files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
		<form
                  className="contact-form row y-gap-30 pt-60 lg:pt-40"
                  onSubmit={handleSubmit}
                >
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      ФИО
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Почта
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Email..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Номер телефона
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      WhatsApp
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Опыт работы
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Основная кухня
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Дополнительные кухни
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      ФИО
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      ФИО
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      ФИО
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      ФИО
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
									<div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      ФИО
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Message...
                    </label>
                    <textarea
                      name="comment"
                      placeholder="Message"
                      rows="8"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -md -purple-1 text-white"
                    >
                      Send Message
                    </button>
                  </div>
                </form>

    <form onSubmit={handleSubmit}>
      <h2>Основная информация</h2>
      <label>
        Имя:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Фамилия:
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Телефон:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        WhatsApp:
        <input
          type="checkbox"
          name="whatsapp"
          checked={formData.whatsapp}
          onChange={handleInputChange}
        />
      </label>

      <h2>Профессиональная информация</h2>
      <label>
        Опыт работы (лет):
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Основная кухня:
        <input
          type="text"
          name="primaryCuisine"
          value={formData.primaryCuisine}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Дополнительные кухни:
        <input
          type="text"
          name="additionalCuisines"
          value={formData.additionalCuisines}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Описание:
        <textarea
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleInputChange}
        ></textarea>
      </label>
      <label>
        Языки:
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleInputChange}
        />
      </label>

      <h2>Фотографии и медиа</h2>
      <label>
        Фото профиля:
        <input type="file" name="profilePicture" onChange={handleFileChange} />
      </label>
      <label>
        Фотографии блюд:
        <input
          type="file"
          name="dishPhotos"
          multiple
          onChange={handleMultiFileChange}
        />
      </label>

      <h2>Информация для заказов</h2>
      <label>
        Минимальная цена заказа:
        <input
          type="number"
          name="minOrderPrice"
          value={formData.minOrderPrice}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Максимальное количество гостей:
        <input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleInputChange}
        />
      </label>
      <label>
        График работы:
        <input
          type="text"
          name="workSchedule"
          value={formData.workSchedule}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Город:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </label>

      <h2>Дополнительные услуги</h2>
      <label>
        Меню:
        <textarea
          name="menuOptions"
          value={formData.menuOptions}
          onChange={handleInputChange}
        ></textarea>
      </label>
      <label>
        Дополнительные услуги:
        <textarea
          name="additionalServices"
          value={formData.additionalServices}
          onChange={handleInputChange}
        ></textarea>
      </label>
      <label>
        Готовность к выездам за город:
        <input
          type="checkbox"
          name="willingnessToTravel"
          checked={formData.willingnessToTravel}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Отправить</button>
    </form>
  );
}

export default ChefProfileForm;
