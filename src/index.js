import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

//Librerias de firebase
import firebase from "firebase";
import firebaseConfig from "./config/firebaseConfig";

import Router from './routes/Router';
import './css/index.css';

// Iniciamos firebaseApp
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Suspense>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
