// Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration (ensure this matches Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyDLWMMX_ymUqE5KT2lJvLHC4oPS7hv5-qQ",
    authDomain: "moo-game-27eb8.firebaseapp.com",
    projectId: "moo-game-27eb8",
    storageBucket: "moo-game-27eb8.appspot.com",
    messagingSenderId: "553878625015",
    appId: "1:553878625015:web:07923b75fe1ebe017051f2",
    measurementId: "G-XJF78NTD3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save data to Firestore
async function saveData(name, email) {
    try {
        const docRef = await addDoc(collection(db, "users"), { name, email });
        console.log("Document written with ID: ", docRef.id);
        alert("Data saved to Firestore!");
    } catch (error) {
        console.error("Error saving data: ", error);
    }
}

// Test data saving
saveData("Test User", "test@example.com");
