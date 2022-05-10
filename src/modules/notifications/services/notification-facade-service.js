import { Subject } from "rxjs"

const notification$ = new Subject();

export const NotificationFacadeService = () =>  {
    const createNewNotification = ({message, type}) => {
        console.log('NEW NOTIFICATION: ' + message)
        notification$.next({message, type});
    }
    const getNotification$ = () => notification$.asObservable();

    return {
        createNewNotification,
        getNotification$
    }
}

