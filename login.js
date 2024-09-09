

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Your web app's Firebase configuration
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
const auth = getAuth();
const db = getDatabase(app);

// Function to check if registration number is already used
async function isRegNoTaken(regno) {
    const dbRef = ref(db, 'users/');
    try {
        const snapshot = await get(child(dbRef, regno));
        return snapshot.exists();
    } catch (error) {
        console.error("Error checking registration number:", error);
        return false;
    }
}

// Handle signup form submission
document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const regis = document.getElementById("regno").value;

    // Check if registration number is unique
    if (await isRegNoTaken(regis)) {
        alert("Registration number already in use.");
        return;
    }

    // Create user
    createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            // Save registration number and other details
            set(ref(db, 'users/' + regis), {
                email: username,
                regno: regis
            })
            .then(() => {
                alert("Account created successfully.");
                window.location.href = "form.html";
            })
            .catch((error) => {
                alert("Error saving registration number.");
                console.error(error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            console.error(error);
        });
});
