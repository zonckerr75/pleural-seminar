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

function displayNameForUser(user) {
  if (user.displayName && user.displayName.trim() !== "") {
    return user.displayName.trim();
  }
  if (user.email) {
    const email = user.email;
    const atIndex = email.indexOf("@");
    return atIndex > 0 ? email.slice(0, atIndex) : email;
  }
  return "";
}

const nameEl = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (nameEl) {
    const name = displayNameForUser(user);
    if (name) {
      nameEl.textContent = name;
    } else {
      nameEl.textContent = "";
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          window.location.href = "login.html";
        })
        .catch((err) => {
          console.error("Error signing out:", err);
        });
    });
  }
});
