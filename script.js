// Import Firebase modules from the official CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration (from your provided setup)
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
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore database

// Reference to the form and data list
const form = document.getElementById("dataForm");
const dataList = document.getElementById("dataList");

// Save data to Firestore when form is submitted
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
        await addDoc(collection(db, "users"), { name, email });
        alert("Data Saved!");
        form.reset();
        fetchData(); // Refresh data list
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Fetch and display stored data from Firestore
async function fetchData() {
    dataList.innerHTML = ""; // Clear list
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `${data.name} - ${data.email}`;
        dataList.appendChild(listItem);
    });
}

// Load data when the page opens
fetchData();
