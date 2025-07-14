import { auth, db } from "../../firebase/firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

async function eventLogger(eventOccured, message) {
  const user = auth.currentUser;
  if (!user) {
    console.warn("No user is currently logged in.");
    return;
  }

  const dbRef = collection(db, "logs");

  try {
    await addDoc(dbRef, {
      userName: user.displayName || user.email || "Anonymous",
      eventOccured: eventOccured,
      message: message,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error Occurred while logging event:", error);
  }
}

export { eventLogger };
