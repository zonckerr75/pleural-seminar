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

// We grab elements inside the callback as well, in case the script loads before DOM is ready
onAuthStateChanged(auth, (user) => {
  console.log("[auth-guard] onAuthStateChanged fired:", !!user);

  if (!user) {
    console.log("[auth-guard] No user, redirecting to login.html");
    window.location.href = "login.html";
    return;
  }

  const nameEl = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");

  if (nameEl) {
    nameEl.textContent = displayNameForUser(user) || "Member";
  } else {
    console.warn("[auth-guard] #user-name element not found");
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          console.log("[auth-guard] Signed out, redirecting to login.html");
          window.location.href = "login.html";
        })
        .catch((err) => {
          console.error("[auth-guard] Error signing out:", err);
        });
    });
  } else {
    console.warn("[auth-guard] #logout-btn element not found");
  }
});
