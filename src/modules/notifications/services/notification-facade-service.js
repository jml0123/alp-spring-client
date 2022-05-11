import { Subject } from "rxjs"

const notification$ = new Subject();

export const NotificationFacadeService = () =>  {
    const createNewNotification = ({message, type}) => {
        notification$.next({message, type});
    }
    const getNotification$ = () => notification$.asObservable();

    return {
        createNewNotification,
        getNotification$
    }
}

