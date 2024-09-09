document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('new_username').value = '';
  document.getElementById('new_password').value = '';
});

// Firebase Initialization and Signup Logic
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGeb4fW6r3hLhPKuBjKFPq9g7z_h8WN_M",
  authDomain: "student-details-c241f.firebaseapp.com",
  projectId: "student-details-c241f",
  storageBucket: "student-details-c241f.appspot.com",
  messagingSenderId: "743466822654",
  appId: "1:743466822654:web:675efbe01c1d0eeb6a6eaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const submit = document.getElementById("submit");
submit.addEventListener("click", function(event) {
  event.preventDefault();

  // Inputs
  const username = document.getElementById('new_username').value;
  const password = document.getElementById('new_password').value;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          alert("CREATING ACCOUNT..");
          window.location.href = "form.html";
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
      });
});
  
