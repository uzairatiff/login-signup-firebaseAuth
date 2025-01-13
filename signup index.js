import { setDoc, doc, getFirestore, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebaseAuth.js";


const onload = ()=>{
    if (user.uid) {
        window.location.href = "dashboard.html"
    }
}


const signUp = async () => {
    try {
        console.log("signup");

        const auth = getAuth(); // Initialize Auth
        const db = getFirestore(); // Initialize Firestore

        // Get input field values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

        // Create user with Firebase Auth
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        // Prepare user data to save in Firestore
        const userData = {
            fullname: name,
            email: email,
            password: password,
        };

        // Add user data to Firestore under "userData" collection
        const userRef = doc(db, "userData", user.uid); // Use the UID as the document ID
        await setDoc(userRef, userData);
        document.getElementById('signupForm').classList.remove('hidden');

        alert("Account Created Successfully!");
        console.log(user.uid);
    } catch (error) {
        console.error("Error creating account:", error.message);
        alert("Failed to create account: " + error.message);
    }
};

// Corrected signIn Function
const signIn =async () => {
    try {
        console.log("signIn");

        // Correct input field IDs for login form
        const email = document.getElementById("emailLogin").value;
        const password = document.getElementById("passwordLogin").value;

        const auth = getAuth(); // Initialize Auth

        // Sign in with Firebase Auth
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = response.user;

        alert("Logged in successfully!");

        // Store user ID in localStorage and redirect
        localStorage.setItem("loggedInUserUid", user.uid);
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Failed to log in: " + error.message);
    }
}



window.signUp = signUp;
window.signIn = signIn;
window.onload = onload;
