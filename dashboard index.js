// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyALzlPjfd3HDYphrnRb9fZR3fzLN8B4xAI",
    authDomain: "login-signup-app-be8ff.firebaseapp.com",
    databaseURL: "https://login-signup-app-be8ff-default-rtdb.firebaseio.com",
    projectId: "login-signup-app-be8ff",
    storageBucket: "login-signup-app-be8ff.appspot.com",
    messagingSenderId: "270128728212",
    appId: "1:270128728212:web:ce11b57d185bc68bb28c81",
    measurementId: "G-D2W12NXX92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// Monitor Auth State
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is logged in:", user.uid);
        try {
            const userDocRef = doc(db, "userData", user.uid); // Ensure "userData" matches your collection name
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                document.getElementById("loggedUserFullName").innerText = userData.fullname;
                document.getElementById("loggedUserEmail").innerText = userData.email;
                document.getElementById("loggedUserPassword").innerText = userData.password;
            } else {
                console.log("No user data found in Firestore.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    } else {
        console.log("No user is logged in.");
        window.location.href = "signup.html"; // Redirect to login/signup if no user is logged in
    }
});

// Logout Functionality
const logout = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem("loggedInUserUid"); // Clear local storage
            alert("Logged out successfully.");
            window.location.href = "signup.html"; // Redirect to signup/login page
        })
        .catch((error) => {
            console.error("Logout Error:", error.message);
            alert("Failed to logout. Please try again.");
        });
};

// Delete Account Functionality
const deleteAccount = async () => {
    const user = auth.currentUser; // Get the currently logged-in user

    if (user) {
        const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
            try {
                // Delete user's data from Firestore
                const userDocRef = doc(db, "userData", user.uid); // Ensure "userData" matches your collection name
                await deleteDoc(userDocRef);

                // Delete user's authentication account
                await user.delete(); // Deletes the user's account

                // Clear local storage and redirect
                localStorage.removeItem("loggedInUserUid");
                alert("Your account has been deleted successfully.");
                window.location.href = "signup.html";
            } catch (error) {
                if (error.code === "auth/requires-recent-login") {
                    alert("You need to log in again to delete your account.");
                } else {
                    console.error("Error deleting account:", error.message);
                    alert("Failed to delete account. Please try again.");
                }
            }
        }
    } else {
        alert("No user is currently logged in.");
        window.location.href = "signup.html"; // Redirect to login/signup page if no user is logged in
    }
};

const blogInput = document.getElementById("blogInput")
const listbox = document.getElementById("listbox")

const createBlog = async () => {
    if (blogInput.value == "") {
        alert("you must write a blog")
    } else {
        let li = document.createElement("li")
        li.className = "bg-purple-700 ml-[110px] mt-[20px] h-[100px] border-[3px] text-white text-2xl font-normal border-yellow-500 w-[843px] text-left flex pl-9 py-7 rounded-lg shadow-md"
        li.innerHTML = blogInput.value
        listbox.appendChild(li)
        let deletebutton = document.createElement("button")
        deletebutton.className = "bg-white h-[40px] w-[160px] mt-[-2px] text-xl text-black rounded-md ml-[350px]"
        deletebutton.innerHTML = "delete"
        li.appendChild(deletebutton)
        let updatebutton = document.createElement("button")
        updatebutton.className = "bg-white h-[40px] ml-[10px] w-[160px] mt-[-1px] text-xl text-black rounded-md"
        updatebutton.innerHTML = "delete"
        li.appendChild(updatebutton)
        blogInput.value = ""
    }
    await setDoc(doc(db, "blogs", user.uid), {
        name: userData.fullname,
        email: userData.email,
        blog : blogInput.valuese
      });

}



// Make the functions available globally
window.createBlog = createBlog;
window.logout = logout;
window.deleteAccount = deleteAccount;
