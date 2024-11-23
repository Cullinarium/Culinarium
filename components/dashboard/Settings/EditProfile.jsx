"use client";

import { useNotification } from "@/context/NotificationContext";
import { database, storage } from "@/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditProfile({ chefId }) {
  const { id } = useParams();

  const [chef, setChef] = useState({
    fullName: "",
    instagram: "",
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
  const { showNotification } = useNotification();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(chef, "chef");

  const changedHandler = async (event) => {
    setImagesLoading(true);

    const imageURL = await uploadFile(
      event.target.files[event.target.files.length - 1],
      `chefs/${chefId}/image_${Date.now()}`
    );

    const userRef = doc(database, "chefs", id);

    if (chef?.images?.length > 0) {
      await updateDoc(userRef, { images: [...chef.images, imageURL] });
    } else {
      await updateDoc(userRef, { images: [imageURL] });
    }

    fetchChef();

    showNotification("Изображение добавлено", "success");
    setImagesLoading(false);
  };

  const [previewImage, setPreviewImage] = useState(
    "/assets/img/dashboard/edit/1.png"
  );

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

  const handleAvatarChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);

      const avatarURL = await uploadFile(file, `chefs/${chefId}/avatar`);
      const userRef = doc(database, "chefs", id);

      await updateDoc(userRef, { avatar: avatarURL });

      fetchChef();

      showNotification("Аватар обновлен", "success");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setChef((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const deleteImage = async (url) => {
    if (imagesLoading) {
      return;
    }

    if (chef?.images.length === 1) {
      showNotification("Нельзя удалить все изображения", "danger");
      return;
    }

    setImagesLoading(true);

    const regex = /image_\d+/;
    const match = url.match(regex)[0];

    const newImages = chef?.images.filter((item) => item !== url);

    const userRef = doc(database, "chefs", id);
    await updateDoc(userRef, { images: newImages });

    const fileRef = ref(storage, `chefs/${chefId}/${match}`);
    await deleteObject(fileRef);

    fetchChef();

    showNotification("Изображение удалено", "success");
    setImagesLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtnLoading(true);

    if (!!chef?.images) {
      showNotification(`Необходимо добавить изображения блюд`, "danger");
    }

    try {
      await setDoc(doc(database, "chefs", chefId), chef);

      showNotification("Повар обновлен", "success");
    } catch (error) {
      showNotification(`Error updating chef: ${error}`, "danger");

      setError("Failed to update course.");
    }
    setBtnLoading(false);
  };

  const fetchChef = async () => {
    try {
      const docRef = doc(database, "chefs", chefId);
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
  }, [chefId]);

  return (
    <div className={`tabs__pane -tab-item-1 is-active`}>
      <div className="row y-gap-20 x-gap-20 items-center">
        <label
          className="col-auto"
          htmlFor="imageUpload"
          style={
            chef?.avatar
              ? {}
              : { backgroundColor: "#f2f3f4", width: 100, height: 100 }
          }
        >
          {chef?.avatar && (
            <Image
              width={100}
              height={100}
              className="size-100"
              src={chef?.avatar}
              alt="avatar"
              style={{ objectFit: "cover", borderRadius: "6px" }}
            />
          )}
        </label>

        <div className="col-auto">
          <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
            <div>
              <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor="imageUpload1"
                  className="icon-cloud text-16"
                ></label>
                <input
                  required
                  id="imageUpload1"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          {loading && <span>Обновление...</span>}
        </div>
      </div>

      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="d-flex flex-wrap justify-content-center row y-gap-20">
            {/* Full Name */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                ФИО <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="ФИО"
                  value={chef.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* instagram */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Instagram <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="instagram"
                  placeholder="culinarium@gmail.com"
                  value={chef.instagram}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Номер телефона <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="phoneNumber"
                  placeholder="996 700 123 456"
                  value={chef.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                WhatsApp <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="whatsapp"
                  placeholder="WhatsApp"
                  value={chef.whatsapp}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Work Experience */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Опыт работы <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="workExperience"
                  placeholder="Количество лет работы в качестве повара"
                  value={chef.workExperience}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Main Cuisine */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Основная кухня <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="mainCuisines"
                  placeholder="Французская, итальянская, японская кухня"
                  value={chef.mainCuisines}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Additional Cuisines */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Дополнительные кухни
              </label>
              <div>
                <input
                  type="text"
                  name="additionalCuisines"
                  placeholder="Список дополнительных кухонь, в которых повар имеет опыт"
                  value={chef.additionalCuisines}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Self-Description */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Описание о себе
              </label>
              <div>
                <input
                  type="text"
                  name="selfDescription"
                  placeholder="О себе, своих услугах и кулинарных предпочтениях"
                  value={chef.selfDescription}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Languages */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Языки <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="languages"
                  placeholder="Кыргызский, русский, английский"
                  value={chef.languages}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Minimum Order Price */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Минимальная цена заказа <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="minOrderPrice"
                  placeholder="Минимальная стоимость услуг повара за одно мероприятие"
                  value={chef.minOrderPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Maximum Number of Guests */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Максимальное количество гостей
              </label>
              <div>
                <input
                  type="text"
                  name="maxGuests"
                  placeholder="Максимальное количества гостей, которых повар может обслужить на мероприятии"
                  value={chef.maxGuests}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Work Schedule */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                График работы
              </label>
              <div>
                <input
                  type="text"
                  name="workSchedule"
                  placeholder="Доступные дни и часы для бронирования"
                  value={chef.workSchedule}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* City */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Город <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="Основной город работы повара"
                  value={chef.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Menu */}
            <div className="col-md-6 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Меню <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <input
                  type="text"
                  name="menu"
                  placeholder="Список блюд"
                  value={chef.menu}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Ready to Travel */}
            <div className="col-md-6 col-12">
              <div className="text-16 lh-12 text-dark-1 fw-500 mb-30">
                Готовность к выездам за город
              </div>
              <div className="form-switch d-flex items-center">
                <div className="text-13 lh-1 text-dark-1 mr-10">Не готов</div>

                <div className="switch">
                  <input
                    type="checkbox"
                    name="readyToTravel"
                    checked={chef.readyToTravel}
                    onChange={handleChange}
                  />
                  <span className="switch__slider"></span>
                </div>
                <div className="text-13 lh-1 text-dark-1 ml-10">Готов</div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="text-16 lh-12 text-dark-1 fw-500 mb-30">
                Активный
              </div>
              <div className="form-switch d-flex items-center">
                <div className="text-13 lh-1 text-dark-1 mr-10">Нет</div>

                <div className="switch">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={chef.isActive}
                    onChange={handleChange}
                  />
                  <span className="switch__slider"></span>
                </div>
                <div className="text-13 lh-1 text-dark-1 ml-10">Да</div>
              </div>
            </div>

            <div className="col-md-10 col-12">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                {imagesLoading ? "Обновление..." : "Изображения блюд"}
              </label>
              <br></br>
              <input
                type="file"
                name="file"
                multiple
                onChange={changedHandler}
              />

              <div className="form-group multi-preview">
                {(chef?.images || []).map((url, index) => (
                  <div
                    key={url}
                    style={{ position: "relative", width: "max-content" }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        position: "absolute",
                        right: "5px",
                        top: "-5px",
                        fontSize: "24px",
                        backgroundColor: "#808080c2",
                        padding: "0 12px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        pointerEvents: imagesLoading ? "none" : "auto",
                        opacity: imagesLoading ? 0.5 : 1,
                      }}
                      onClick={() => deleteImage(url)}
                      disabled={imagesLoading}
                    >
                      X
                    </div>
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
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="button -md -purple-1 text-white"
                disabled={btnLoading}
              >
                {btnLoading ? "Обновляется..." : "Обновить"}
              </button>
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
  );
}
