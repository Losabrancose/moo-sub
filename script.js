// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
