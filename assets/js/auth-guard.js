// assets/js/auth-guard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZq933hFxLT1K49auoZjBnYWEdi2mKUFI",
  authDomain: "pleural-seminar-2025.firebaseapp.com",
  projectId: "pleural-seminar-2025",
  storageBucket: "pleural-seminar-2025.appspot.com",
  messagingSenderId: "914784082205",
  appId: "1:914784082205:web:448e2d4fe8e9579075a9f4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmailSpan = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");

const currentPath = window.location.pathname;
const redirectParam = encodeURIComponent(currentPath + window.location.search);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Preserve where they were trying to go
    window.location.href = "login.html?redirect=" + redirectParam;
    return;
  }

  if (userEmailSpan) {
    userEmailSpan.textContent = user.email;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        window.location.href = "login.html";
      });
    });
  }
});
