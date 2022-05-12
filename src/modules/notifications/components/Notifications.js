import React, { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { NotificationFacadeService } from "../services/notification-facade-service";

const { getNotification$ } = NotificationFacadeService();

export default function Notifications() {
  const [notification, setNotification] = useState(null);
  const [notificationIsVisible, openNotification] = useState(false);
  const orientation = {
    vertical: "bottom",
    horizontal: "right",
  };
  const handleClose = () => {
    openNotification(false);
  };

  /*
  * Monitor for any changes in the notification$ observable, and update the notification accordingly
  * Everytime the value changes, we will also open the notification
  */
  useEffect(() => {
    getNotification$().subscribe((notification) => {
      if (notification) {
        setNotification(notification);
        openNotification(true);
      } else {
        setNotification(null);
        openNotification(false);
      }
    });
  });

  return (
    <Snackbar
      open={notificationIsVisible}
      autoHideDuration={5000}
      anchorOrigin={orientation}
      key={orientation}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={notification?.type}>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
}
