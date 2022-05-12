import { Subject } from "rxjs";

const notification$ = new Subject();

 /*
  * A set of functions that will allow any component to create new notifications
  * There is a notification$ subject which can be accessed as an observable, to provide the desired notification message and type to a subscriber
  */
export const NotificationFacadeService = () => {
  const createNewNotification = ({ message, type }) => {
    notification$.next({ message, type });
  };
  const getNotification$ = () => notification$.asObservable();

  return {
    createNewNotification,
    getNotification$,
  };
};
