"use client";

import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { database, storage } from "@/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useNotification } from "@/context/NotificationContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ChefRegister() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    whatsapp: "",
    workExperience: "",
    mainCuisines: "",
    additionalCuisines: "",
    selfDescription: "",
    languages: "",
    minOrderPrice: "",
    maxGuests: "",
    workSchedule: "",
    city: "",
    menu: "",
    readyToTravel: false,
  });

  const [avatar, setAvatar] = useState(null);
  const [images, setImages] = useState([]);

  const [preview, setPreview] = useState([]);
  const [previewAvatar, setPreviewAvatar] = useState();

  const fileobj = [];

  const changedHandler = (event) => {
    let files = event.target.files;
    setImages((prev) => [...prev, ...Array.from(event.target.files)]);
    fileobj.push(files);
    let reader;

    for (var i = 0; i < fileobj[0].length; i++) {
      reader = new FileReader();
      reader.readAsDataURL(fileobj[0][i]);
      reader.onload = (event) => {
        preview.push(event.target.result);

        setPreview([...new Set(preview)]);
      };
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        setPreviewAvatar(event.target.result);
      };

      setAvatar(e.target.files[0]);
    } else if (e.target.name === "images") {
      setImages(Array.from(e.target.files));
    }
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requiredFields = [
      "fullName",
      "email",
      "phoneNumber",
      "workExperience",
      "mainCuisines",
      "languages",
      "minOrderPrice",
      "city",
      "menu",
    ];

    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        showNotification("Заполните все обязательные поля");
        setLoading(false);
        return;
      }
    }

    if (!avatar) {
      setLoading(false);
      return;
    }

    if (images?.length < 3) {
      showNotification("Добавьте мин 3 изображения блюд", "danger");
      setLoading(false);
      return;
    }

    try {
      const timestamp = Date.now();

      const newFormData = {
        ...formData,
        isActive: false,
        createdAt: new Date(timestamp).toISOString(),
      };

      const chefDocRef = await addDoc(
        collection(database, "chefs"),
        newFormData
      );

      const chefId = chefDocRef.id;

      if (avatar) {
        const avatarURL = await uploadFile(avatar, `chefs/${chefId}/avatar`);
        await updateDoc(chefDocRef, { avatar: avatarURL });
      }

      const imageURLs = await Promise.all(
        images.map((image, index) =>
          uploadFile(image, `chefs/${chefId}/image_${Date.now()}`)
        )
      );

      await updateDoc(chefDocRef, { images: imageURLs });

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

                {/* Email */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Почта <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="culinarium@gmail.com"
                      value={formData.email}
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

                {/* WhatsApp */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    WhatsApp
                  </label>
                  <div>
                    <input
                      type="text"
                      name="whatsapp"
                      placeholder="WhatsApp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Work Experience */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Опыт работы <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="workExperience"
                      placeholder="Количество лет работы в качестве повара"
                      value={formData.workExperience}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Main Cuisine */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Основная кухня <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="mainCuisines"
                      placeholder="Французская, итальянская, японская кухня"
                      value={formData.mainCuisines}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Additional Cuisines */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Дополнительные кухни
                  </label>
                  <div>
                    <input
                      type="text"
                      name="additionalCuisines"
                      placeholder="Список дополнительных кухонь, в которых повар имеет опыт"
                      value={formData.additionalCuisines}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Self-Description */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Описание о себе
                  </label>
                  <div>
                    <input
                      type="text"
                      name="selfDescription"
                      placeholder="О себе, своих услугах и кулинарных предпочтениях"
                      value={formData.selfDescription}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Languages */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Языки <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="languages"
                      placeholder="Кыргызский, русский, английский"
                      value={formData.languages}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Minimum Order Price */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Минимальная цена заказа{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div>
                    <input
                      required
                      type="text"
                      name="minOrderPrice"
                      placeholder="Минимальная стоимость услуг повара за одно мероприятие"
                      value={formData.minOrderPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Maximum Number of Guests */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Максимальное количество гостей
                  </label>
                  <div>
                    <input
                      type="text"
                      name="maxGuests"
                      placeholder="Максимальное количества гостей, которых повар может обслужить на мероприятии"
                      value={formData.maxGuests}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Work Schedule */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    График работы
                  </label>
                  <div>
                    <input
                      type="text"
                      name="workSchedule"
                      placeholder="Доступные дни и часы для бронирования"
                      value={formData.workSchedule}
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
                      placeholder="Основной город работы повара"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Menu */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Меню
                  </label>
                  <div>
                    <input
                      type="text"
                      name="menu"
                      placeholder="Список блюд"
                      value={formData.menu}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Ready to Travel */}
                <div className="col-md-5 col-12">
                  <div className="text-16 lh-12 text-dark-1 fw-500 mb-30">
                    Готовность к выездам за город
                  </div>
                  <div className="form-switch d-flex items-center">
                    <div className="text-13 lh-1 text-dark-1 mr-10">
                      Не готов
                    </div>

                    <div className="switch">
                      <input
                        type="checkbox"
                        name="readyToTravel"
                        checked={formData.readyToTravel}
                        onChange={handleChange}
                      />
                      <span className="switch__slider"></span>
                    </div>
                    <div className="text-13 lh-1 text-dark-1 ml-10">Готов</div>
                  </div>
                </div>

                {/* Avatar upload */}
                <div className="col-md-5 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Загрузить аватар*
                  </label>
                  <br></br>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                  />
                  {previewAvatar && (
                    <div className="form-group multi-preview">
                      <img
                        src={previewAvatar}
                        alt="avatar"
                        style={{ height: "200px", width: "200px" }}
                      />
                    </div>
                  )}
                </div>

                <div className="col-md-10 col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Загрузить изображения блюд(минимум 3 изображения)*
                  </label>
                  <br></br>
                  <input
                    type="file"
                    name="file"
                    multiple
                    required
                    onChange={changedHandler}
                  />

                  <div className="form-group multi-preview">
                    {(preview || []).map((url, index) => (
                      <img
                        src={url}
                        alt="..."
                        key={index}
                        style={{
                          height: "200px",
                          width: "200px",
                          margin: "10px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
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
