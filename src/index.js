import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

//Librerias de firebase
import firebase from "firebase";

import Router from './routes/Router';
import './css/index.css';

// Iniciamos firebaseApp
firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

ReactDOM.render(
  <Suspense>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
