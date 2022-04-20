import { useState } from 'react';

//Librerias de firebase
import firebase from "firebase";
import "firebase/auth";

const useUser = () => {
    const [user, setUser] = useState(null);

    firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser)
            setUser(currentUser);
    });

    return {
        user
    }
}

export default useUser;