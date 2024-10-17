import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, notification }}>
      {children}

      {!!notification && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
          }}
        >
          <div
            className={`d-flex items-center justify-between ${
              notification?.type === "success" ? "bg-success-1" : "bg-error-1"
            } pl-30 pr-20 py-30 rounded-8`}
          >
            <div
              className={` ${
                notification?.type === "success"
                  ? "text-success-2"
                  : "text-error-2"
              } lh-1 fw-500`}
            >
              {notification?.message}
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
