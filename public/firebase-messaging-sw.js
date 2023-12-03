importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA2EpMv3IO2TjzZq9jN0fi7FEizP3PFCnc",
  authDomain: "veterinariaapp-pwa.firebaseapp.com",
  projectId: "veterinariaapp-pwa",
  storageBucket: "veterinariaapp-pwa.appspot.com",
  messagingSenderId: "906800602527",
  appId: "1:906800602527:web:ba9fc22af562bbf6da31aa",
  measurementId: "G-LV1E0RBGTQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log('Recibiendo mensaje en segundo plano')
    const tituloNotificacion = payload.notification.title;
    const options = {
      body: payload.notification.body,
      icon: 'https://icons.veryicon.com/png/o/miscellaneous/utility/alert-26.png',
    }
  
    self.registration.showNotification(tituloNotificacion, options);
  })