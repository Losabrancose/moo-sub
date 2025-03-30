// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration (replace with your Firebase project config)
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

// Reference to the form and list
const form = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Save data to Firestore when the form is submitted
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        // Add document to Firestore
        const docRef = await addDoc(collection(db, "users"), {
            name: name,
            email: email
        });
        console.log("Document written with ID: ", docRef.id);

        // Clear form inputs
        form.reset();

        // Refresh user list
        fetchUsers();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Fetch and display all users from Firestore
async function fetchUsers() {
    userList.innerHTML = ''; // Clear existing list

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

// Initial call to fetch and display users
fetchUsers();
