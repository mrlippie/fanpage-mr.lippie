// Firebase configuratie
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase-instellingen
const firebaseConfig = {
  apiKey: "AIzaSyAPq_Ne7qyMmvMv5HB4yvRttR4_RVFTaWY",
  authDomain: "mrlippie-e902d.firebaseapp.com",
  databaseURL: "https://mrlippie-e902d-default-rtdb.firebaseio.com/",
  projectId: "mrlippie-e902d",
  storageBucket: "mrlippie-e902d.appspot.com",
  messagingSenderId: "647573705899",
  appId: "1:647573705899:web:48f2efd835ff2027e493ee",
  measurementId: "G-HJP2XE9JE8"
};

// Firebase initialiseren
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Elementen selecteren
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const commentsContainer = document.getElementById("commentsContainer");

// Comments laden bij het openen van de pagina
function loadComments() {
  const commentsRef = ref(database, "comments/");
  onValue(commentsRef, (snapshot) => {
    commentsContainer.innerHTML = ""; // Clear de container
    const data = snapshot.val();
    if (data) {
      const comments = Object.values(data);
      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.textContent = `${comment.name}: ${comment.message}`;
        commentsContainer.appendChild(commentElement);
      });
    }
  });
}

// Comment versturen
function submitComment() {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert("Vul alstublieft zowel een naam als een bericht in.");
    return;
  }

  const timestamp = Date.now();
 
