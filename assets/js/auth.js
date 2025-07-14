import { auth, db } from "../../firebase/firebase-config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { eventLogger } from "../../assets/js/logger.js"

function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      location.href = "dashboard.html";
    })
    .then(() => {
      alert("Login successful!");
    })
    .catch(error => {
      alert("Login Failed: " + error.message);
    });
};

function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      updateProfile(userCredential.user, { displayName: name })
        .then(() => {
          alert(`Registration successful: ${email}`);
          location.href = "login.html";
        })
    })
    .catch(error => {
      alert("Registration Failed: " + error.message);
    });
};

document.getElementById("loginBtn")?.addEventListener("click", () => {
  loginUser()
})
document.getElementById("registerBtn")?.addEventListener("click", () => {
  registerUser()
})

