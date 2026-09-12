/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const showNotification = useCallback(
    ({ type = "info", title = "", message = "", duration = 4000 }) => {
      const id = Date.now() + Math.random();

      setNotifications((prev) => [
        ...prev,
        {
          id,
          type,
          title,
          message,
        },
      ]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [removeNotification],
  );

  const showSuccess = useCallback(
    (message, title = "Thành công") => {
      return showNotification({
        type: "success",
        title,
        message,
      });
    },
    [showNotification],
  );

  const showError = useCallback(
    (message, title = "Có lỗi xảy ra") => {
      return showNotification({
        type: "error",
        title,
        message,
      });
    },
    [showNotification],
  );

  const showWarning = useCallback(
    (message, title = "Cảnh báo") => {
      return showNotification({
        type: "warning",
        title,
        message,
      });
    },
    [showNotification],
  );

  const showInfo = useCallback(
    (message, title = "Thông báo") => {
      return showNotification({
        type: "info",
        title,
        message,
      });
    },
    [showNotification],
  );

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeNotification,
      }}
    >
      {children}

      <div className="fixed top-5 right-5 z-[9999] flex w-[380px] max-w-[calc(100vw-24px)] flex-col gap-3">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification phải được sử dụng bên trong NotificationProvider",
    );
  }

  return context;
};
